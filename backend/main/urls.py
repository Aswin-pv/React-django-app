from django.urls import path,include

app_name = 'main'

urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('vendors/', include('vendors.urls')),
    path('customers/', include('customers.urls')),
    path('categories/', include('categories.urls')),
    path('orders/', include('orders.urls')),
    path('products/', include('products.urls')),
    path('wishlist/', include('wishlist.urls')),
]
