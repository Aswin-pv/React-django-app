from rest_framework import generics,viewsets
from .models import Customer,CustomerAddress,Cart
from . import serializers
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import status
from django.http import JsonResponse
from orders.models import Order
from wishlist.models import WishList
from rest_framework.views import APIView
from accounts.authenticate import CustomAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# class CartView(generics.ListCreateAPIView):
#     queryset = Cart.objects.all()
#     serializer_class = serializers.Cartserializer
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [CustomAuthentication]

#     def perform_create(self, serializer):
#         # Automatically set the customer field to the logged-in user
#         customer = self.request.user.customer
#         serializer.save(customer=customer)


class CartViewSet(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [CustomAuthentication]

    def list(self, request):
        print("Getting all items from cart")
        # Get all cart items for the logged-in customer
        # customer = request.user.customer
        # queryset = Cart.objects.filter(customer=customer)
        queryset = Cart.objects.all()

        serializer = serializers.Cartserializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        print('carttttt')
        # Automatically set the customer to the logged-in user during creation
        customer = request.user.customer
        serializer = serializers.Cartserializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=customer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        product_id = pk
        customer = request.user.customer
        print(product_id,customer)
        # Check if the cart item exists for the current customer and product
        try:
            cart_item = Cart.objects.get(customer=customer, product_id=product_id)
            cart_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({"detail": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)



class CheckCartProductView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]

    def get(self, request,product_id):
        print("checklist running")
        customer = request.user.customer
        product_in_cart = Cart.objects.filter(customer=customer, product_id=product_id, is_active=True).exists()
        return Response({"in_cart": product_in_cart}, status=status.HTTP_200_OK)


#Customer serializers
class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer


#Customer AddressList 
class CustomerAddressList(generics.ListAPIView):
    queryset = CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(customer__id=customer_id).order_by('-default_address', 'id')
        print(qs)
        return qs


# Remove item from wishlist
@csrf_exempt
def mark_default_address(request,pk):
    if request.method == 'POST':
        data = json.loads(request.body)
        address_id = data['address_id']
        CustomerAddress.objects.update(default_address=False)
        response= CustomerAddress.objects.filter(id=address_id).update(default_address=True)
        updated_address = CustomerAddress.objects.order_by('-default_address', 'id')
        
        msg = {
            'bool':False
        }

        if response:
            updated_address_list = list(updated_address.values())
            
            msg = {
            'bool':True,
            'address':updated_address_list,
        }
        
        return JsonResponse(msg)
    

    
class CustomerDashboard(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [CustomAuthentication]
  
    def get(self,request):
        print(request.COOKIES)
        return Response({
            "success":True
        })

        # user = request.user
        # try:
        #     vendor = Vendor.objects.get(user=user)
        #     vendor_id = vendor.id
        #     total_products = Product.objects.filter(vendor__id= vendor_id).count()
        #     total_orders = VendorOrderItem.objects.filter(product__vendor__id=vendor_id).count()
        #     total_customers = OrderItem.objects.filter(product__vendor__id=vendor_id).values('order__customer').count()
        
        #     dashboard_data = {

        #     'total_products': total_products,
        #     'total_orders': total_orders,
        #     'total_customers': total_customers,

        #     }

        #     serializers = VendorDashboardSerializer(dashboard_data)
            
        #     return Response(serializers.data, status=status.HTTP_200_OK)
        
        # except Vendor.DoesNotExist:

        #     return Response({"success": False, "error": 
    



class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = CustomerAddress.objects.all()
 
    





    

