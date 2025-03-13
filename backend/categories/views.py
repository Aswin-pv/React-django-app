from .models import ProductCategory
from . import serializers
from rest_framework import filters
from rest_framework import viewsets


class CategoryList(viewsets.ModelViewSet):

    queryset = ProductCategory.objects.all().order_by('title')
    serializer_class = serializers.CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']  
    

    # def get_queryset(self):
    #     print("running categorylist")
    #     qs = ProductCategory.objects.all()
    #     title = self.request.query_params.get('search')
    #     if title is not None:
    #         qs = qs.filter(title__icontains=title)
    #     return qs



#Category serializers
# class CategoryList(generics.ListCreateAPIView):
#     queryset = ProductCategory.objects.all()
#     serializer_class = serializers.CategorySerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['title']
    
    
#     def get_queryset(self):
#         qs = super().get_queryset()
#         title = self.request.query_params.get('title')
#         if title is not None:
#             qs = qs.filter(title__icontains=title)
#         return qs


# class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = ProductCategory.objects.all()
#     serializer_class = serializers.CategoryDetailSerializer