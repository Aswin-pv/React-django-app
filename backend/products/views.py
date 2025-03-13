from rest_framework import generics
from . import serializers
from .models import Product,ProductCategory,ProductImage,ProductRating
from vendors.models import Vendor
from rest_framework import pagination
from rest_framework.exceptions import NotFound
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from accounts.authenticate import CustomAuthentication
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend


#Product serializers
class ProductList(generics.ListCreateAPIView):

    queryset = Product.objects.all().order_by('id') 
    serializer_class = serializers.ProductListSerializer
    filter_backends = [filters.SearchFilter,filters.OrderingFilter,DjangoFilterBackend]
    filterset_fields = {
        'price' : ['lte'],
    }
    search_fields = ['title','category__title'] #Add fields to search
    ordering_fields = ['price', 'title', 'date_added'] ##sorting options

    def perform_create(self, serializer):
        vendor = Vendor.objects.get(user=self.request.user)
        serializer.save(vendor=vendor)

    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.GET.get('category')
        vendor_id = self.request.GET.get('vendor')
        search = self.request.query_params.get('search', None)
        price = self.request.query_params.get('price')

        # if price:
        #     print("price is getting",price)
        #     print(qs)
        #     qs = qs.filter(price__lt=int(price))
        #     print("filtered using price",qs)

        if search:
            print(search)
            search_terms = [term.strip() for term in search.split(',')]
            query = Q()
            for term in search_terms:
                print(term)
                query |= Q(category__title__icontains=term) 
            qs = qs.filter(query)

     
        #vendor exists get the reverse relation
        if vendor_id:
        
            vendor = Vendor.objects.get(id=vendor_id)
            qs = vendor.products.all()
        #if category exists    
        if category_id:
         
            category = ProductCategory.objects.get(id=category_id)
            qs = qs.filter(category=category)

        
        #product data in home page display
        # if 'fetch_limit' in self.request.GET:
        #     print(qs)
        #     print("fetching")
        #     limit = int(self.request.GET['fetch_limit'])
        #     qs = qs[:limit]
         
        # print("reurning products",qs)
        return qs
    
    
def product_filter(request):
    category = request.GET.get('category')  # Get the 'category' parameter
    page = request.GET.get('page')  # Get the 'page' parameter
    print(category,page)
    
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer
    
#Product views
class ProductImagesList(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

#ProductImage detail views
class ProductImagesDetail(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['product_id']
        qs = qs.filter(product__id=product_id)
        return qs
    
#ProductImage delete views
class ProductImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

    
#TagProduct serializers
class TagProductList(generics.ListCreateAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        # getting tagname from url
        tag = self.kwargs['tag']
        # if any product contains the same tag, filter and get it
        qs = qs.filter(tags__icontains=tag)
        return qs    
    

#Related Product serializers
class RelatedProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        try:
            product_id = self.kwargs['pk']
            product = Product.objects.get(id=product_id)
            related_products = Product.objects.filter(category=product.category).exclude(id=product_id)
            return related_products
        except Product.DoesNotExist:
            raise NotFound("Product matching query does not exist.")   



class ProductRating(generics.ListCreateAPIView):
    serializer_class = serializers.ProductRatingSerializer
    queryset = ProductRating.objects.all()  


    



