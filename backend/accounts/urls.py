from django.urls import path,include
from . import views

app_name = 'accounts'

urlpatterns = [
    path('user/<int:pk>/', views.UserDetail.as_view(), name='user_detail'),
    path('vendor/register/', views.VendorRegisterView.as_view(), name='vendor_register'),
    path('vendor/login/', views.VendorLoginView.as_view(), name='vendor_login'),
    path('vendor/logout/', views.VendorLogoutView.as_view(), name='vendor_logout'),
    path('customer/register/', views.CustomerRegisterView.as_view(), name='customer_register'),
    path('customer/login/', views.CustomerLoginView.as_view(), name='customer_login'),
    path('customer/logout/', views.CustomerLogoutView.as_view(), name='customer_logout'),
    
]