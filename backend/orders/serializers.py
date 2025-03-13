from rest_framework import serializers
from .models import Order,OrderItem
from products.serializers import ProductDetailSerializer
from customers.serializers import CustomerSerializer
from accounts.serializers import UserSerializer


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'customer', 'order_status', 'total_amount', 'total_usd_amount']

    # customize the behaviour of serilizer by go to 1 depth in related model
    # def __init__(self, *args, **kwargs):
    #     super(OrderSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1   


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product']

    #customize the behaviour of serilizer by go to 1 depth in related model
    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1    


class OrderItemSerializer(serializers.ModelSerializer):
    # order = OrderDetailSerializer()
    # product = ProductDetailSerializer()
    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'qty', 'price', 'usd_price']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['order'] = OrderSerializer(instance.order).data
        response['product'] = ProductDetailSerializer(instance.product).data
        response['customer'] = CustomerSerializer(instance.order.customer).data
        response['user'] = UserSerializer(instance.order.customer.user).data
        return response