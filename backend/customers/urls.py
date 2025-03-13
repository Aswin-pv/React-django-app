from django.urls import path,include
from . import views
from rest_framework import routers

app_name = 'customers'

router = routers.DefaultRouter()
router.register('address',views.CustomerAddressViewSet,basename="addresses")
router.register('cart',views.CartViewSet, basename="cart")

urlpatterns = [
    #customer related urls
    path('', views.CustomerList.as_view()),
    # path('cart/',views.CartView.as_view()),
    path('cart/check/<int:product_id>/', views.CheckCartProductView.as_view(), name='check_cart_product'),
    path('customer/dashboard/', views.CustomerDashboard.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('customer/<int:pk>/address-list/', views.CustomerAddressList.as_view()),
    path('mark-default-address/<int:pk>/', views.mark_default_address,name='mark_default_address'),   

]

urlpatterns += router.urls