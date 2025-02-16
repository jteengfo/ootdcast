# views handle
from django.shortcuts import render
from django.contrib.auth import get_user_model, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json

from rest_framework import generics
from rest_framework.parsers import JSONParser
from .models import User, ClothingItem, Outfit
from .serializers import UserSerializer, ClothingItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .weather import get_weather_data

User = get_user_model()

# Create your views here.
class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            # parse JSON data from request
            data = JSONParser().parse(request)
            serializer = UserSerializer(data = data)

            if serializer.is_valid():
                # save user using serializer createUser method
                user = serializer.createUser(serializer.validated_data)
                return JsonResponse({'message': 'User created successfully', 'user_id':user.id}, status=201)
            else:
                return JsonResponse(serializer.errors, status=400)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        try:
            # parse json data from req
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # auth user
            user = authenticate(username=username, password=password)

            if user is not None:
                # means login successful
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                # invalid credentials
                return JsonResponse({'error': 'Invalid username or password'}, status=401)

        except Exception as e:
            # handle unexpected errors
            return JsonResponse({'error': str(e)}, status=500)
        
    else:
        # invalid request method
        return JsonResponse({'error': 'Invalid request method'}, status=405)

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