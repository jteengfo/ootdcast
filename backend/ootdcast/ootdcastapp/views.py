# views handle
from django.shortcuts import render
from rest_framework import generics
from .models import User, ClothingItem, Outfit
from .serializers import UserSerializer, ClothingItemSerializer


# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ClothingItemDelete(generics.DestroyAPIView):
    queryset = ClothingItem.objects.all()
    serializer_class = ClothingItemSerializer