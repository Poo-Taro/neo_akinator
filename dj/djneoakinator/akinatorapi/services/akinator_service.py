"""
アキネーターサービスロジック

Created on 2020/05/25
@author Taro Suzuki
"""


import copy
import re
from datetime import datetime

import pandas as pd

from sklearn import tree
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier

from ..models.tblakinator import TblAkinator
from ..models.mstcharacter import MstCharacter
from ..models.mstquestion import MstQuestion


def get_dataframe_obj(t_a_l, m_q_l, m_c_l):
    """
    データフレームオブジェクト作成(全体)

    @param t_a_l アキネーターテーブルリスト
    @param m_q_l 質問マスタリスト
    @param m_c_l キャラクタマスタリスト
    @return データフレームオブジェク
    """
    df_obj = {}

    for q in m_q_l:
        q_id = q.mstquestion_id
        q_c_list = []
        for c in m_c_l:
            c_id = c.mstcharacter_id
            f_list = list(filter(lambda x: x.mstcharacter.mstcharacter_id == c_id and x.mstquestion.mstquestion_id == q_id , t_a_l))
            if len(f_list) > 0:
                q_c_list.append(get_test_answer(f_list[0]))
            else:
                q_c_list.append(0)
        df_obj['q_' + str(q_id)] = q_c_list

    df_obj['character'] = list(map(lambda x: x.mstcharacter_id, m_c_l))

    return df_obj


def get_dataframe_obj_with_request(t_a_l, m_q_l, m_c_l, q_k_l):
    """
    データフレームオブジェクト作成(一部)

    @param t_a_l アキネーターテーブルリスト
    @param m_q_l 質問マスタリスト
    @param m_c_l キャラクタマスタリスト
    @param q_k_l リクエストデータ質問キーリスト
    @return データフレームオブジェク
    """
    df_obj = {}

    for q in m_q_l:
        q_id = q.mstquestion_id
        q_c_list = []
        for c in m_c_l:
            c_id = c.mstcharacter_id
            f_list = list(filter(lambda x: x.mstcharacter.mstcharacter_id == c_id and x.mstquestion.mstquestion_id == q_id , t_a_l))
            if len(f_list) > 0:
                q_c_list.append(get_test_answer(f_list[0]))
            else:
                q_c_list.append(0)

        key = 'q_' + str(q_id)
        if len(list(filter(lambda k: k == key, q_k_l))) > 0:
            df_obj[key] = q_c_list

    df_obj['character'] = list(map(lambda x: x.mstcharacter_id, m_c_l))

    return df_obj


def get_dataframe_obj_by_request(questions):
    """
    リクエストデータフレームオブジェクト作成

    @param questions リクエストデータリスト
    @return データフレームオブジェクト
    """
    df_obj = {}

    for item in questions:
        df_obj[item['key']] = [float(item['value'])]

    return pd.DataFrame(df_obj)


def get_new_question(all_df_obj, df_obj):
    """
    新質問キー取得

    @param all_df_obj データフレームオブジェクト(全体)
    @param df_obj データフレームオブジェクト(一部)
    """
    test_list = []
    charactor_key = 'character'
    for i, key in enumerate(all_df_obj.keys()):
        if (key not in df_obj) and (key != charactor_key):
            test_obj = {}

            copy_obj = copy.deepcopy(df_obj)
            copy_obj[key] = all_df_obj[key]

            key_list = copy_obj.keys()

            copy_obj[charactor_key] = all_df_obj[charactor_key]

            df = pd.DataFrame(copy_obj)
            x = df.loc[:, key_list].values
            y = df.loc[:, [charactor_key]].values

            clf = tree.DecisionTreeClassifier(max_depth=10)
            clf = clf.fit(x, y)
            y_pre = clf.predict(x)

            test_obj['key'] = int(re.search(r'^q_(\d+)$', key).group(1))
            test_obj['value'] = accuracy_score(y, y_pre)
            test_list.append(test_obj)

    return median_cal(test_list)


def get_new_question_by_all(t_a_l, m_q_l, m_c_l):
    """
    新質問キー取得(全体)

    @param t_a_l アキネーターテーブルリスト
    @param m_q_l 質問マスタリスト
    @param m_c_l キャラクタマスタリスト
    @return 新質問キー
    """
    character_key = 'character'
    df_obj = get_dataframe_obj(t_a_l, m_q_l, m_c_l)
    x_keys = list(filter(lambda key: key != character_key, df_obj.keys()))

    df = pd.DataFrame(df_obj)
    x = df.loc[:, x_keys].values
    y = df.loc[:, character_key].values

    forest = RandomForestClassifier(
        n_estimators = 6,
        max_depth = 4,
        random_state = 0
    )
    forest.fit(x, y)
    features = forest.feature_importances_

    test_list = []
    for i, item in enumerate(features):
        test_obj = {}
        test_obj['key'] = i
        test_obj['value'] = item
        test_list.append(test_obj)

    return median_cal_first_questions(test_list)


def get_now_accuracy_score(dataframe_obj, keys):
    """
    スコア(現在)取得

    @param dataframe_obj データフレームオブジェクト
    @param keys xキー
    @return スコア
    """

    df = pd.DataFrame(
        dataframe_obj
    )

    x = df.loc[:, keys].values
    y = df.loc[:, ['character']].values

    clf = tree.DecisionTreeClassifier(max_depth=10)
    clf = clf.fit(x, y)
    y_pre = clf.predict(x)

    return accuracy_score(y, y_pre)


def get_pre(dataframe_obj, req_dataframe_obj, keys):
    """
    予測値取得

    @param dataframe_obj データフレームオブジェクト(教師)
    @param req_dataframe_obj データフレームオブジェクト(リクエストデータ)
    @param keys キーリスト
    @return 予測値
    """
    df = pd.DataFrame(dataframe_obj)
    x = df.loc[:, keys].values
    y = df.loc[:, ['character']].values
    clf = tree.DecisionTreeClassifier(max_depth=10)
    clf = clf.fit(x, y)

    r_df = pd.DataFrame(req_dataframe_obj)
    x2 = r_df.loc[:, keys].values

    return clf.predict(x2)


def update_answers(request_data):
    """
    回答更新

    @param request_data リクエストデータ
    @return 更新結果
    """
    answer_list = request_data['questions']
    mstcharacter_id = request_data['mstcharacter_id']

    update_list = []
    for item in answer_list:
        tablakinator_id = int(re.search(r'^q_(\d+)$', item['key']).group(1))
        answer = float(item['value'])

        tblakinator = TblAkinator.objects.get(pk=tablakinator_id)

        if answer == 1: # はい
            if tblakinator.yes:
                tblakinator.yes += 1
            else:
                tblakinator.yes = 1
        elif answer == 0.5: # いいえ
            if tblakinator.no:
                tblakinator.no += 1
            else:
                tblakinator.no += 1
        elif answer == 0.0: # 分からない
            if tblakinator.donotunderstand:
                tblakinator.donotunderstand += 1
            else:
                tblakinator.donotunderstand += 1
        elif answer == -0.5: # 多分そう
            if tblakinator.maybeyes:
                tblakinator.maybeyes += 1
            else:
                tblakinator.maybeyes += 1
        elif answer == -1.0: # 多分違う
            if tblakinator.maydifferent:
                tblakinator.maydifferent += 1
            else:
                tblakinator.maydifferent += 1

        tblakinator.update_user = 'WEB'
        tblakinator.update_datetime = datetime.now()

        update_list.append(tblakinator)
    
    TblAkinator.objects.bulk_update(update_list, fields=[
        'yes',
        'no',
        'donotunderstand',
        'maybeyes',
        'maydifferent',
        'update_user',
        'update_datetime'
    ])

    return 'update_success'


def create_character(request_data):
    """
    キャラクタ作成

    @param request_data リクエストデータ
    @return 作成結果
    """
    character_name = request_data['character_name']
    img_url = request_data['img_url']

    mstcharacter = MstCharacter()
    mstcharacter.character_name = character_name
    mstcharacter.img_url = img_url
    mstcharacter.insert_user = 'WEB'
    mstcharacter.insert_datetime = datetime.now()
    mstcharacter. delete_flg = 0
    mstcharacter.save()

    mstcharacter_last = MstCharacter.objects.filter(character_name=character_name) \
                        .order_by('-mstcharacter_id')[0]

    mstquestion_qs = MstQuestion.objects.all()
    bulk_create_list = []
    for mq in mstquestion_qs:
        t_a = TblAkinator()
        t_a.mstcharacter = mstcharacter_last
        t_a.mstquestion = mq
        t_a.yes = 0
        t_a.no = 0
        t_a.donotunderstand = 0
        t_a.maybeyes = 0
        t_a.maydifferent = 0
        t_a.insert_user = 'WEB'
        t_a.insert_datetime = datetime.now()
        t_a.delete_flg = 0
        bulk_create_list.append(t_a)
    TblAkinator.objects.bulk_create(bulk_create_list)

    return 'create_success'


def create_question(request_data):
    """
    質問作成

    @param request_data リクエストデータ
    @return 作成結果
    """
    question_detail = request_data['question_detail']

    mstquestion = MstQuestion()
    mstquestion.question_content = question_detail
    mstquestion.insert_user = 'WEB'
    mstquestion.insert_datetime = datetime.now()
    mstquestion.delete_flg = 0
    mstquestion.save()

    mstquestion_last = MstQuestion.objects.filter(question_content=question_detail) \
                        .order_by('-mstquestion_id')[0]

    mstcharacter_qs = MstCharacter.objects.all()
    bulk_create_list = []
    for mc in mstcharacter_qs:
        t_a = TblAkinator()
        t_a.mstcharacter = mc
        t_a.mstquestion = mstquestion_last
        t_a.yes = 0
        t_a.no = 0
        t_a.donotunderstand = 0
        t_a.maybeyes = 0
        t_a.maydifferent = 0
        t_a.insert_user = 'WEB'
        t_a.insert_datetime = datetime.now()
        t_a.delete_flg = 0
        bulk_create_list.append(t_a)
    TblAkinator.objects.bulk_create(bulk_create_list)

    return 'create_success'


def get_test_answer(x):
    """
    回答取得関数

    @param x アキネーターテーブルオブジェクト
    @return 回答
    """

    result = 0

    yes = x.yes
    no = x.no
    donotunderstand = x.donotunderstand
    maybeyes = x.maybeyes
    maydifferent = x.maydifferent

    # はい
    if yes > no \
        and yes > donotunderstand \
        and yes > maybeyes \
        and yes > maydifferent:
        result = 1.0

    # いいえ
    if result == 0 \
        and no > yes \
        and no > donotunderstand \
        and no > maybeyes \
        and no > maydifferent:
        result = 0.5

    # 多分そう
    if result == 0 \
        and maybeyes > yes \
        and maybeyes > no \
        and maybeyes > donotunderstand \
        and maybeyes > maydifferent:
        result = -0.5

    # 多分違う
    if result == 0 \
        and maydifferent > yes \
        and maydifferent > no \
        and maydifferent > donotunderstand \
        and maydifferent > maybeyes:
        result = -1.0

    # 分からない
    if result != 0 \
        and donotunderstand > yes \
        and donotunderstand > no \
        and donotunderstand > maybeyes \
        and maydifferent > maydifferent:
        result = 0

    return result


def get_locs(m_q_l):
    """
    プロパティ名リスト取得

    @param m_q_l 質問マスタリスト
    @return プロパティ名リスト
    """
    return list(map(lambda x: 'q_' + str(x.mstquestion_id), m_q_l))


def median_cal(data_list):
    """
    中央値算出

    @param data_list データリスト
    @return 中央値アイテム
    """
    num = len(data_list)
    # データを昇順ソート
    data_list = bubble_sort_datalist(data_list)
    # データ数が偶数の場合
    if num % 2 == 0:
        median1 = int(num / 2)
        return data_list[median1]
    # データ数が奇数の場合
    else:
        median = int((num + 1) / 2 - 1)
        return data_list[median]


def median_cal_first_questions(data_list):
    """
    最低値取得
    一番重要度の低い質問を取得する

    @param data_list データリスト
    @return 最低値アイテム
    """

    if len(data_list) == 0:
        return None

    # データを昇順ソート
    data_list = bubble_sort_datalist(data_list)

    return data_list[0]


def bubble_sort_datalist(data_list):
    """
    データリストソート

    @param data_list データリスト
    @return ソート後のリスト
    """
    change = True
    while change:
        change = False
        for i in range(len(data_list) - 1):
            if data_list[i]['value'] > data_list[i + 1]['value']:
                data_list[i], data_list[i + 1] = data_list[i + 1], data_list[i]
                change = True
    return data_list

