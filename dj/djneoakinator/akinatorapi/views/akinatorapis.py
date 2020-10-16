"""
アキネーターのapi機能を提供するモジュール

Created on 2020/05/24
@author Taro Suzuki
"""

import copy
import re

from django.conf import settings
from django.db import transaction
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import check_password

from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


import numpy as np

from sklearn import tree
from sklearn.datasets import *
from sklearn.metrics import accuracy_score
from sklearn.ensemble import RandomForestClassifier

import pandas as pd

from ..models.tblakinator import TblAkinator
from ..models.mstcharacter import MstCharacter
from ..models.mstquestion import MstQuestion
from ..serializers.akinator_serializer import (
    GetQuestionSerializer,
    UpdateAnswersSerializer,
    CreateCharacterSerializer,
    CreateQuestionSerializer,
    SearchCharacerSerializer
)
from ..services import akinator_service as service



@api_view(['POST'])
@permission_classes((AllowAny,))
def get_question(request):
    """
    質問内容取得

    @param request リクエスト
    @return 質問内容リスト
    """
    serializer = GetQuestionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    questions = serializer.data['questions']
    # questions = [{'key':'q_1','value':1.0},{'key':'q_11','value':0}]
    # questions = []
    # tblakinator_ids = list(map(lambda q: int(re.search(r'^q_(\d+)$', q['key']).group(1)) ,questions))
    # .exclude(mstquestion__mstquestion_id__in=tblakinator_ids)
    tbl_akinator_list = list(TblAkinator.objects.all().order_by('mstcharacter'))
    mst_question_list = list(MstQuestion.objects.all())
    mst_character_list = list(MstCharacter.objects.all())

    if len(questions) == 0:
        result = {}
        result['answer_flg'] = '0'
        new_q_item = service.get_new_question_by_all(tbl_akinator_list, mst_question_list, mst_character_list)
        result['new_question_id'] = new_q_item['key']
        result['new_question_accuracy_score'] = new_q_item['value']
        msq_qs = MstQuestion.objects.filter(mstquestion_id=new_q_item['key'], delete_flg=0)
        if len(msq_qs) > 0:
            result['question_content'] = msq_qs[0].question_content
            questions.append({'key': 'q_' + str(new_q_item['key']), 'value': None})
        result['questions'] = questions
        return Response(result)

    key_list = list(map(lambda item: item['key'], questions))

    all_df_obj = service.get_dataframe_obj(tbl_akinator_list, mst_question_list, mst_character_list)
    df_obj = service.get_dataframe_obj_with_request(tbl_akinator_list, mst_question_list, mst_character_list, key_list)
    req_df_obj = service.get_dataframe_obj_by_request(questions)

    result = {}
    if service.get_now_accuracy_score(df_obj, key_list) > 0.8 or len(questions) >= 20:
        result['answer_flg'] = '1'
        pre = service.get_pre(df_obj, req_df_obj, key_list)
        if len(pre) > 0:
            msthcaracter_id = pre[0]
            result['mstcharacter_id'] = msthcaracter_id
            msc_qs = MstCharacter.objects.filter(mstcharacter_id=msthcaracter_id, delete_flg=0)
            if len(msc_qs) > 0:
                result['character_name'] = msc_qs[0].character_name
        result['questions'] = questions
    else:
        result['answer_flg'] = '0'
        new_q_item = service.get_new_question(all_df_obj, df_obj)
        result['new_question_id'] = new_q_item['key']
        result['new_question_accuracy_score'] = new_q_item['value']
        msq_qs = MstQuestion.objects.filter(mstquestion_id=new_q_item['key'], delete_flg=0)
        if len(msq_qs) > 0:
            result['question_content'] = msq_qs[0].question_content
            questions.append({'key': 'q_' + str(new_q_item['key']), 'value': None})
        result['questions'] = questions

    return Response(result)


@api_view(['POST'])
@permission_classes((AllowAny,))
def update_answers(request):
    """
    回答更新

    @param request リクエスト
    @return 更新結果
    """
    serializer = UpdateAnswersSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    requst_data = serializer.data

    message = service.update_answers(requst_data)

    return Response({
        'message': message
    })


@api_view(['POST'])
@permission_classes((AllowAny,))
def create_character(request):
    """
    キャラクタ作成

    @param request リクエスト
    @return 作成結果
    """
    serializer = CreateCharacterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    requst_data = serializer.data

    message = service.create_character(requst_data)

    return Response({
        'message': message
    })


@api_view(['POST'])
@permission_classes((AllowAny,))
def create_question(request):
    """
    質問作成

    @param request リクエスト
    @return 作成結果
    """
    serializer = CreateQuestionSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    requst_data = serializer.data

    message = service.create_question(requst_data)

    return Response({
        'message': message
    })


@api_view(['POST'])
@permission_classes((AllowAny,))
def search_character(request):
    """
    キャラクタ検索

    @param request リクエスト
    @return 検索結果
    """
    serializer = SearchCharacerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    requst_data = serializer.data

    mstcharacter_qs = MstCharacter.objects.filter(character_name__contains=requst_data['character_name'])

    character_list = []
    for item in list(mstcharacter_qs):
        character = {}

        character['mstcharacter_id'] = item.mstcharacter_id
        character['character_name'] = item.character_name
        character['img_url'] = item.img_url

        character_list.append(character)

    return Response({
        'character_list': character_list
    })


@api_view(['POST'])
@permission_classes((AllowAny,))
def get_data_score(request):
    """
    スコア取得
    DBに登録されているすべてのデータから、現在のスコアを取得する

    @param request リクエスト
    @return スコア
    """
    tbl_akinator_list = list(TblAkinator.objects.all().order_by('mstcharacter'))
    mst_question_list = list(MstQuestion.objects.all())
    mst_character_list = list(MstCharacter.objects.all())

    df = pd.DataFrame(
        service.get_dataframe_obj(tbl_akinator_list, mst_question_list, mst_character_list)
    )

    x = df.loc[:, service.get_locs(mst_question_list)].values
    y = df.loc[:, ['character']].values

    clf = tree.DecisionTreeClassifier(max_depth=10)
    clf = clf.fit(x, y)
    y_pre = clf.predict(x)

    forest = RandomForestClassifier(
        n_estimators = 6,
        max_depth = 4,
        random_state = 0
    )
    forest.fit(x, y)

    return Response({
        'tf_version': tf.__version__,
        'np_version' : np.__version__,
        'pandas_version' : pd.__version__,
        'feature_importances_': forest.feature_importances_,
        'accuracy_score': accuracy_score(y, y_pre)
    })








