from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    #Order related urls
    path('', views.OrderList.as_view()),
    path('orderitem/', views.OrderItemList.as_view()),
    path('order-modify/<int:pk>/', views.OrderModify.as_view()),
    path('delete-customer-order/<int:customer_id>/', views.DeleteCustomerOrder),
    path('customer/<int:pk>/orderitems/', views.CustomerOrderItemList.as_view()),
    path('order/<int:pk>/', views.OrderDetail.as_view()),
    path('update-order-status/<int:order_id>/', views.UpdateOrderStatus, name='update_order_status'),
]