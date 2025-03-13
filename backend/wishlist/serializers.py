from rest_framework import serializers
from .models import WishList
from customers.serializers import CustomerSerializer
from products.serializers import ProductDetailSerializer

class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = ['id', 'product', 'customer']

    # customize the behaviour of serilizer by go to 1 depth in related model
    # def __init__(self, *args, **kwargs):
    #     super(WishListSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1         

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['customer'] = CustomerSerializer(instance.customer).data
        response['product'] = ProductDetailSerializer(instance.product).data
        return response