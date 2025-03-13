from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'vendors'

router = DefaultRouter()
router.register('',views.VendorList,basename='vendors')


urlpatterns = [
    
    #vendors related urls
    # path('', views.VendorList.as_view(), name='vendor_list'),
    path('vendor-products/', views.VendorProduct.as_view(),name='vendor_products'),
    # path('vendor/<int:pk>/', views.VendorDetail.as_view(), name='vendor_detail'),
    path('vendor-change-password/<int:vendor_id>', views.vendor_change_password, name='vendor_change_password'),
    path('vendor/<int:pk>/orderitems/', views.VendorOrderItemList.as_view(), name='vendor_order_items'),
    path('vendor/<int:pk>/customers/', views.VendorCustomerList.as_view(), name='vendor_customers'),
    path('vendor/dashboard/', views.VendorDashboard.as_view(), name='vendor_dashboard'),
    path('vendor/<int:vendor_id>/customer/<int:customer_id>/orderitems/', views.VendorCustomerOrderItemList.as_view(), name='vendor_customer_order'),

    path('', include(router.urls)),
]