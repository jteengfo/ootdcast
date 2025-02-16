# views handle
from django.shortcuts import render
from django.contrib.auth import get_user_model, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework import generics
from rest_framework.parsers import JSONParser
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
    
