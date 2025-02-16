from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/create/', views.create_user, name='create_user'),
    path('auth/login/', views.user_login, name='user_login'),
    path('weather/', views.get_weather, name='get-weather'),

    # clothing
    # GET
    path('clothing-items/', views.ClothingItemListCreate.as_view(), name='clothing-item-list'),
    # ADD 
    path('clothing-items/create/', views.ClothingItemListCreate.as_view(), name='clothing-item-create'),
    # DELETE
    path('clothing-items/delete/<int:pk>/', views.ClothingItemDelete.as_view(), name='clothing-item-delete'),
]