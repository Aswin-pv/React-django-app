from django.contrib import admin
from .models import Customer,CustomerAddress,Cart


class CustomerAdmin(admin.ModelAdmin):
    list_display = ['get_username','id', 'mobile']

    def get_username(self,obj):
        return obj.user.username
    
class CartAdmin(admin.ModelAdmin):
    list_display = ['customer', 'product', 'quantity', 'is_active']

admin.site.register(Customer, CustomerAdmin)
admin.site.register(CustomerAddress)
admin.site.register(Cart,CartAdmin)
