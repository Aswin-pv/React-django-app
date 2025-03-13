from django.urls import path
from . import views

app_name = 'wishlist'

urlpatterns = [
    #wishlist related urls
    path('', views.WishListView.as_view()),
    path('check-in-wishlist/<int:product_id>/', views.check_product_in_wishlist, name='check_in_wishlist'),
    path('customer/<int:pk>/wish-list-items/', views.WishItemList.as_view()),
    path('remove-wishlist-item/', views.remove_from_wishlist, name='remove_from_wishlist'),  
]