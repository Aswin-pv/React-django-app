from rest_framework import serializers
from .models import Customer,CustomerAddress,Cart
from accounts.serializers import UserSerializer
from products.serializers import ProductDetailSerializer


class Cartserializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['product'] = ProductDetailSerializer(instance.product).data
        return response


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile']

    #customize the behaviour of serilizer by go to 1 depth in related model
    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1  
        

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile','profile_img']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response 
    
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ['id', 'customer', 'address', 'default_address']

    #customize the behaviour of serilizer by go to 1 depth in related model
    # def __init__(self, *args, **kwargs):
    #     super(CustomerAddressSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1 


