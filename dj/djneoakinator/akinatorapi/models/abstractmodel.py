"""
モデル抽象クラス

Created on 2020/05/24
@author Taro Suzuki
"""

import datetime

from django.db import models
from django.core import validators
from django.utils.translation import ugettext_lazy as _


class AbstractModel(models.Model):

    insert_user = models.CharField(max_length=150, blank=False, null=False, editable=False, verbose_name=_('登録ユーザー'))
    insert_datetime = models.DateTimeField(default=datetime.datetime.now(), editable=False, verbose_name=_('登録日時'))
    insert_prg = models.CharField(max_length=150, blank=True, null=True, verbose_name=_('登録プログラム'))
    update_user = models.CharField(max_length=150, blank=False, null=False, editable=False, verbose_name=_('更新ユーザー'))
    update_datetime = models.DateTimeField(default=datetime.datetime.now(), editable=False, verbose_name=_('更新日時'))
    update_prg = models.CharField(max_length=150, blank=True, null=True, verbose_name=_('更新プログラム'))
    delete_flg = models.SmallIntegerField(verbose_name=_('削除フラグ'), default=0, choices=[(0, 'OFF'), (1, 'ON'), ],
                                          validators=[validators.MinValueValidator(0),
                                                      validators.MaxValueValidator(1)],)

    class Meta:
        abstract = True



