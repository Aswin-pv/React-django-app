from django.contrib import admin
from .models import Order,OrderItem,VendorOrderItem


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer', 'order_time', 'order_status', 'total_amount', 'total_usd_amount']

admin.site.register(Order,OrderAdmin)   

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'qty', 'price', 'usd_price']

admin.site.register(OrderItem,OrderItemAdmin) 


class VendorOrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'qty', 'price', 'usd_price']

admin.site.register(VendorOrderItem,VendorOrderItemAdmin)