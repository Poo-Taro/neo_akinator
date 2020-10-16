"""
アキネーターテーブルモデル

Created on 2020/05/24
@author Taro Suzuki
"""

from django.db import models
from django.utils.translation import ugettext_lazy as _

from .abstractmodel import AbstractModel
from .mstcharacter import MstCharacter
from .mstquestion import MstQuestion


class TblAkinator(AbstractModel):
    """
    アキネーターテーブル
    """

    tblakinator_id = models.AutoField(verbose_name=_('アキネーターテーブルID'), primary_key=True)
    mstcharacter = models.ForeignKey(MstCharacter, verbose_name=_('キャラクタマスタID'), related_name='TblAkinator_mstcharacter', on_delete=models.PROTECT, null=False)
    mstquestion = models.ForeignKey(MstQuestion, verbose_name=_('質問マスタID'), related_name='TblAkinator_mstquestion', on_delete=models.PROTECT, null=False)
    yes = models.BigIntegerField(verbose_name=_('はい'), default=0, null=False)
    no = models.BigIntegerField(verbose_name=_('いいえ'), default=0, null=False)
    donotunderstand = models.BigIntegerField(verbose_name=_('分からない'), default=0, null=False)
    maybeyes = models.BigIntegerField(verbose_name=_('たぶんそう'), default=0, null=False)
    maydifferent = models.BigIntegerField(verbose_name=_('たぶん違う'), default=0, null=False)

    class Meta:
        app_label = 'akinatorapi'
        db_table = 'tbl_akinator'
        verbose_name = _('アキネーターテーブル')
        verbose_name_plural = _('アキネーターテーブル')
        ordering = ['tblakinator_id']



