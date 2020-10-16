"""
アキネーターシリアライザ

Created on 2020/05/26
@author taro.suzuki
"""


import re
from rest_framework import serializers


class GetQuestionSerializer(serializers.Serializer):
    """
    質問取得リクエストシリアライザ
    """

    # 質問リスト
    questions = serializers.ListField(required=False, allow_null=False)


class UpdateAnswersSerializer(serializers.Serializer):
    """
    回答更新シリアライザ
    """

    # 質問リスト
    questions = serializers.ListField(required=True, allow_null=False)
    # キャラクタマスタID
    mstcharacter_id = serializers.IntegerField(required=True, allow_null=False)


class CreateCharacterSerializer(serializers.Serializer):
    """
    キャラクタ作成シリアライザ
    """

    # キャラクタ名
    character_name = serializers.CharField(required=True, allow_null=False, allow_blank=False,)
    # 画像url
    img_url = serializers.URLField(required=False, allow_null=True, allow_blank=True,)


class CreateQuestionSerializer(serializers.Serializer):
    """
    質問作成シリアライザ
    """

    # 質問内容
    question_detail = serializers.CharField(required=True, allow_null=False, allow_blank=False,)


class SearchCharacerSerializer(serializers.Serializer):
    """
    キャラクタ検索シリアライザ
    """

    character_name = serializers.CharField(required=True, allow_null=False, allow_blank=False,)





