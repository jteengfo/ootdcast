# views handle
from django.shortcuts import render
from rest_framework import generics
from .models import User, ClothingItem, Outfit
from .serializers import UserSerializer, ClothingItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .weather import get_weather_data


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

@api_view(['GET'])
def get_weather(request):
    city = request.query_params.get('city', 'Edmonton')
    weather_data = get_weather_data(city)
    
    if weather_data:
        return Response(weather_data)
    return Response(
        {'error': f'Could not find weather data for city: {city}. Please check the city name and try again.'}, 
        status=400
    )