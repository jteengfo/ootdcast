# views handle
from django.shortcuts import render
from django.contrib.auth import get_user_model, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
import requests
import random

from rest_framework import generics
from rest_framework.parsers import JSONParser
from .models import User, ClothingItem, Outfit
from .serializers import UserSerializer, ClothingItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .weather import get_weather_data
from google import genai

client = genai.Client(api_key="AIzaSyBTrWVF5JEuk7MUdGW1PuL2c9ANBW4UiU4")

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

@api_view(['GET'])
def get_user_clothing_items(request, user_id):
    try:
        # Fetch current temperature
        city = request.query_params.get('city', 'Edmonton')
        weather_data = get_weather_data(city)
        temperature = weather_data['temperature'] if weather_data else None
        
        if temperature is None:
            return JsonResponse({'error': 'Could not retrieve weather data'}, status=400)

        # Fetch clothing items for the user
        clothing_items = ClothingItem.objects.filter(user_id=user_id)  # Assuming ClothingItem has a user foreign key
        
        # Filter clothing items based on temperature (you may need to adjust this logic)
        filtered_items = [item for item in clothing_items if item.is_suitable_for_temperature(temperature)]  # Assuming a method to check suitability
        
        if not filtered_items:
            return JsonResponse({'error': 'No suitable clothing items found for the current temperature'}, status=404)

        # Select a random clothing item
        selected_item = random.choice(filtered_items)
        serializer = ClothingItemSerializer(selected_item)

        return Response(serializer.data, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def suggest_outfit(request, user_id):
    try:
        # Fetch user's clothing items
        clothing_items = ClothingItem.objects.filter(user_id=user_id)
        serializer = ClothingItemSerializer(clothing_items, many=True)
        
        # Get current temperature
        city = request.query_params.get('city', 'Edmonton')
        weather_data = get_weather_data(city)
        temperature = weather_data['temperature'] if weather_data else None
        
        if temperature is None:
            return JsonResponse({'error': 'Could not retrieve weather data'}, status=400)

        # Prepare data for Gemini API
        outfit_request_data = {
            "clothes": serializer.data,
            "temperature": temperature,
        }

        print(temperature)

        # Call Gemini API
        gemini_response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=(
                f"Suggest one outfit based on the following clothes in accordance with their warmth levels based on temperature So if temperature is warm or high then we will seek for lower warmth level: {outfit_request_data['clothes']}. "
                f"The temperature is {temperature}. "
                "Please provide the outfit as a list of clothing items, formatted as a Python list (e.g., ['item1', 'item2', 'item3']). "
                "The clothing should not be the same every time. "
                "Return only the list of clothing items."
                "Just give me the list like a proper list in python"
                "just put clothes in [] seperated by ,"
                "It doesn't need to be a proper outfit but somewhat whatv we can wear"
                "No outfits can be same"
                "Dont just use highest warmth. Just randomly select clothing elements within reasonable warmth level based on temperature"
                
            )
        )

        return JsonResponse({'suggested_outfit': gemini_response.text}, status=200)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)