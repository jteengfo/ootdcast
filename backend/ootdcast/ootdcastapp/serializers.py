# serializers convert Django model instances into JSON (& vice versa)

from rest_framework import serializers
from .models import User, ClothingItem, Outfit

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 
                  'password', 'location', 
                  'preferences']
        extra_kwargs = {
            'password': {'write_only': True},    # ensures password is write-only
            'location': {'required': False},
            'preferences': {'required': False}
        }

    def createUser(self, validated_data):
        # create a user with a hashed password
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            location=validated_data.get('location'),
            preferences=validated_data.get('preferences')
        )

        return user

class ClothingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothingItem
        fields = '__all__'

class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = '__all__'
