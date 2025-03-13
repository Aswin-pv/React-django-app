from django.views.decorators.csrf import csrf_exempt
from orders.models import Order,OrderItem
from rest_framework import generics
from django.http import JsonResponse
from . import serializers



class OrderModify(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderModify(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderDelete(generics.RetrieveDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer


#Order
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer

    def post(self, request, *args, **kwargs):
        print("running successfully")
        return super().post(request, *args, **kwargs)
    
#Order Item 
class OrderItemList(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer

#Ordered item for a specific customer
class CustomerOrderItemList(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(order__customer__id=customer_id)
        return qs
       

@csrf_exempt
def UpdateOrderStatus(request,order_id):
    if request.method == 'POST':
        print("order staus running")
        updatedStatus = Order.objects.filter(id=order_id).update(order_status='C')
        msg = {
            'bool':False,
        }

        if updatedStatus:
            msg = {
                'bool':True,
            }

    return JsonResponse(msg)


@csrf_exempt
def DeleteCustomerOrder(request,customer_id):
    orders = Order.objects.filter(customer__id=customer_id).delete()
    msg = {
        'bool':False,
    }

    if orders:
        msg = {
            'bool':True,
        }

    return JsonResponse(msg)

class OrderDetail(generics.ListCreateAPIView):
    # queryset = OrderItem.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id = self.kwargs['pk']
        order = Order.objects.get(id=order_id)
        order_items = OrderItem.objects.filter(order=order)
        return order_items