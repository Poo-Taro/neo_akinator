"""
キャラクタマスタモデル

Created on 2020/05/24
@author Taro Suzuki
"""

from django.db import models
from django.utils.translation import ugettext_lazy as _

from .abstractmodel import AbstractModel


class MstCharacter(AbstractModel):
    """
    キャラクタマスタ
    """

    mstcharacter_id = models.AutoField(verbose_name=_('キャラクタマスタID'), primary_key=True)
    character_name = models.CharField(verbose_name=_('キャラクタ名称'), max_length=200, blank=False, null=False)
    img_url = models.URLField(verbose_name=_('画像url'), blank=True, null=True)

    class Meta:
        app_label = 'akinatorapi'
        db_table = 'mst_character'
        verbose_name = _('キャラクタマスタ')
        verbose_name_plural = _('キャラクタマスタ')
        ordering = ['mstcharacter_id']



