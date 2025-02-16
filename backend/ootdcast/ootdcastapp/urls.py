from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/create/', views.create_user, name='create_user'),
    path('auth/login/', views.user_login, name='user_login'),
    path('clothing/delete/<int:pk>/', views.ClothingItemDelete.as_view(), name='delete-clothing'),
    path('weather/', views.get_weather, name='get-weather'),
]