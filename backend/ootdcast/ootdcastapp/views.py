# views handle
from django.shortcuts import render
from django.contrib.auth import get_user_model, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from rest_framework import generics
from .models import User, ClothingItem, Outfit
from .serializers import UserSerializer

User = get_user_model()

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@login_required
def delete_user(request, user_id):
    if request.user.id != user_id or not request.user.is_staff:
        messages.error(request, "You do not have permission to delete this account")
        return 