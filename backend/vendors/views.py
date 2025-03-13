from django.views.decorators.csrf import csrf_exempt
from orders.models import OrderItem,VendorOrderItem
from rest_framework import generics
from rest_framework.views import APIView
from django.http import JsonResponse
from . import serializers
from products.models import Product
from .models import Vendor
from django.contrib.auth.hashers import make_password
from orders.serializers import OrderItemSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import VendorDashboardSerializer
from rest_framework import status
from rest_framework.views import APIView
from accounts.authenticate import CustomAuthentication
from rest_framework import viewsets
from products.serializers import ProductListSerializer
from rest_framework import filters

# Create your views here.

#Vendor views
class VendorList(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = serializers.VendorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name']


    
#Products for current vendor
class VendorProduct(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]

    def get(self,request):
        vendor_id = request.user.vendor.first().id
        vendor_products = Product.objects.filter(vendor__id=vendor_id)
        serializers = ProductListSerializer(vendor_products, many=True)
        return Response(serializers.data)

    

# class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Vendor.objects.all()
#     serializer_class = serializers.VendorDetailSerializer


@csrf_exempt
def vendor_change_password(request,vendor_id):
    if request.method == 'POST':
        password = request.POST.get('password')
        vendor = Vendor.objects.get(id=vendor_id)
        user = vendor.user
        user.password = make_password(password)
        user.save()

    msg = {
        'bool':True,
        'msg':'Password has been Changed'
    }    

    return JsonResponse(msg)    

    
class VendorOrderItemList(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs
    
    
class VendorCustomerOrderItemList(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['vendor_id']
        customer_id = self.kwargs['customer_id']
        qs = qs.filter(product__vendor__id=vendor_id, order__customer__id=customer_id)
        
        return qs

#vendor customer
class VendorCustomerList(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs 

class VendorDashboard(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]
  
    def get(self,request):
        print("VEndor dashboard inside")
        user = request.user
        try:
            vendor = Vendor.objects.get(user=user)
            vendor_id = vendor.id
            total_products = Product.objects.filter(vendor__id= vendor_id).count()
            total_orders = VendorOrderItem.objects.filter(product__vendor__id=vendor_id).count()
            total_customers = OrderItem.objects.filter(product__vendor__id=vendor_id).values('order__customer').count()
        
            dashboard_data = {

            'total_products': total_products,
            'total_orders': total_orders,
            'total_customers': total_customers,

            }

            serializers = VendorDashboardSerializer(dashboard_data)
            
            return Response(serializers.data, status=status.HTTP_200_OK)
        
        except Vendor.DoesNotExist:

            return Response({"success": False, "error": "Vendor does not exist for this user"}, status=status.HTTP_404_NOT_FOUND)
            
        

