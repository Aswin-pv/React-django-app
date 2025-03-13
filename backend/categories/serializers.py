from rest_framework import serializers
from .models import ProductCategory

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'detail', 'category_img']

    #customize the behaviour of serilizer by go to 1 depth in related model
    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1


# class CategoryDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProductCategory
#         fields = ['id', 'title', 'detail']

#     #customize the behaviour of serilizer by go to 1 depth in related model
#     def __init__(self, *args, **kwargs):
#         super(CategoryDetailSerializer, self).__init__(*args, **kwargs)
#         # self.Meta.depth = 1    