"""
akinatorapi.urlpatterns

Created on 2020/05/24
@author Taro Suzuki
"""

from django.urls import path
from rest_framework import routers


from .views.akinatorapis import (
    get_question,
    update_answers,
    create_character,
    create_question,
    search_character,
    get_data_score,
)


router = routers.DefaultRouter()

urlpatterns = [
    path('get-question/', get_question),
    path('update-anwers/', update_answers),
    path('create-character/', create_character),
    path('create-question/', create_question),
    path('search-character/', search_character),
    path('get-data-score/', get_data_score),
]

urlpatterns += router.urls



