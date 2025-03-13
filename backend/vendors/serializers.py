from rest_framework import serializers
from .models import Vendor
from accounts.serializers import UserSerializer

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response 
    
# class VendorSerializer(serializers.ModelSerializer):

#     username = serializers.SerializerMethodField()

#     class Meta:
#         model = Vendor
#         fields = ['id', 'user','username', 'address', 'profile_img']

#     #create username without underscores
#     def get_username(self, obj):
#         return obj.user.username.replace('_', ' ')

#     # customize the behaviour of serilizer by go to 1 depth in related model
#     # def __init__(self, *args, **kwargs):
#     #     super(VendorSerializer, self).__init__(*args, **kwargs)
#     #     self.Meta.depth = 1


# class VendorDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Vendor
#         fields = ['id', 'user','mobile', 'profile_img', 'address'] #need to add charts hereeee

#     #customize the behaviour of serilizer by go to 1 depth in related model
#     def __init__(self, *args, **kwargs):
#         super(VendorDetailSerializer, self).__init__(*args, **kwargs)
#         # self.Meta.depth = 1    

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user).data
#         return response 
    
    

class VendorDashboardSerializer(serializers.Serializer):
    total_products = serializers.IntegerField()
    total_orders = serializers.IntegerField()
    total_customers = serializers.IntegerField()

    

