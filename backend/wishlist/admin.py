from django.contrib import admin
from .models import WishList


class WishListAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'customer']

admin.site.register(WishList,WishListAdmin)    