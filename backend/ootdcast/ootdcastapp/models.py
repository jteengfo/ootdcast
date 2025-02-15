from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

# User Model
class User(AbstractUser):
    location = models.CharField(max_length=100, blank=True, null=True)
    preferences = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.username

# ClothingItem Model
class ClothingItem(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    formality = models.CharField(max_length=50)
    warmth_level = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cloting_items')

    def __str__(self):
        return self.name
    
# Outfit Model
class Outfit(models.Model):
    id = models.AutoField(primary_key=True)
    weather_compatibility = models.CharField(max_length=100)
    formality = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='outfits')
    clothing_items = models.ManyToManyField(ClothingItem, related_name='outfits')

    def __str__(self):
        return f"Outfit {self.id} by {self.user.username}"