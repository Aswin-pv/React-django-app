from django.contrib import admin
from .models import Vendor


class VendorAdmin(admin.ModelAdmin):
    model = Vendor
    list_display = ['id','user']

admin.site.register(Vendor,VendorAdmin)
