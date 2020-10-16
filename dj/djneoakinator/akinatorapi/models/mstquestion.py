"""
質問マスタモデル

Created on 2020/05/24
@author Taro Suzuki
"""

from django.db import models
from django.utils.translation import ugettext_lazy as _

from .abstractmodel import AbstractModel


class MstQuestion(AbstractModel):
    """
    質問マスタ
    """

    mstquestion_id = models.AutoField(verbose_name=_('質問マスタID'), primary_key=True)
    question_content = models.CharField(verbose_name=_('質問内容'), max_length=400, blank=False, null=False)

    class Meta:
        app_label = 'akinatorapi'
        db_table = 'mst_question'
        verbose_name = _('質問マスタ')
        verbose_name_plural = _('質問マスタ')
        ordering = ['mstquestion_id']




