from django.contrib import admin
from .models import User, ClothingItem, Outfit

# Register your models here.

admin.site.register(User)
admin.site.register(ClothingItem)
admin.site.register(Outfit)
