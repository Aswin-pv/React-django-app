from django.urls import path
from . import views


app_name = 'products'


urlpatterns = [
    #Product related urls
    path('', views.ProductList.as_view()),
    path('filter/',views.product_filter),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
    path('product-images/', views.ProductImagesList.as_view()),
    path('product-images/<int:product_id>/', views.ProductImagesDetail.as_view()),
    path('product-images/<int:pk>', views.ProductImageDetail.as_view()),
    path('products/<str:tag>', views.TagProductList.as_view()),
    path('add-product-rating/<int:pk>/', views.ProductRating.as_view()),
]
