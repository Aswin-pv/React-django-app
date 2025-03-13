from django.contrib import admin
from .models import CustomUser,oneTimePassword

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_staff', 'is_superuser', 'is_active']

admin.site.register(CustomUser,CustomUserAdmin)

class OTPAdmin(admin.ModelAdmin):
    list_display = ['user', 'code']

admin.site.register(oneTimePassword,OTPAdmin)