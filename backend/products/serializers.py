from rest_framework import serializers
from .models import Product,ProductImage,ProductRating


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'product', 'image']

class ProductListSerializer(serializers.ModelSerializer):

    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    discounted_price_inr = serializers.SerializerMethodField()
    discounted_price_usd = serializers.SerializerMethodField()


    class Meta:
        model = Product
        fields = ['id', 'category', 'title', 'slug', 'tag_list', 'detail', 'vendor', 'price', 
                  'usd_price', 'product_ratings', 'image', 'product_file', 'tags','published_status',
                    'discount_percentage', 'discounted_price_inr','discounted_price_usd','date_added']

    #customize the behaviour of serilizer by go to 1 depth in related model
    def __init__(self, *args, **kwargs):
        super(ProductListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1    


    def get_discounted_price_inr(self,obj):
        if obj.discount_percentage is not None:   
            discount_amount = (obj.price * obj.discount_percentage) / 100
            return "{:.2f}".format(obj.price - discount_amount)
        return None
        
    
    def get_discounted_price_usd(self,obj):
        if obj.discount_percentage is not None:
            discount_amount = (obj.usd_price * obj.discount_percentage) / 100
            return "{:.2f}".format(obj.usd_price - discount_amount)
        return None





class ProductDetailSerializer(serializers.ModelSerializer):

    product_ratings = serializers.StringRelatedField(many=True, read_only=True)
    product_images = ProductImageSerializer(many=True, read_only=True)
    discounted_price_inr = serializers.SerializerMethodField()
    discounted_price_usd = serializers.SerializerMethodField()

    class Meta:
        many = True
        model = Product
        fields = ['id', 'category', 'title', 'detail', 'vendor', 'slug', 'price', 'usd_price', 'tag_list', 'product_ratings', 'product_images', 'image', 'product_file','tags','discount_percentage', 'discounted_price_inr','discounted_price_usd','discount_percentage', 'discounted_price_inr','discounted_price_usd']

    #customize the behaviour of serilizer by go to 1 depth in related model
    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1    

    def get_discounted_price_inr(self,obj):
        if obj.discount_percentage is not None:   
            discount_amount = (obj.price * obj.discount_percentage) / 100
            return "{:.2f}".format(obj.price - discount_amount)
        return None
        
    
    def get_discounted_price_usd(self,obj):
        if obj.discount_percentage is not None:
            discount_amount = (obj.usd_price * obj.discount_percentage) / 100
            return "{:.2f}".format(obj.usd_price - discount_amount)
        return None


class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ['id', 'customer', 'product', 'rating', 'reviews']

    #customize the behaviour of serilizer by go to 1 depth in related model
    # def __init__(self, *args, **kwargs):
    #     super(ProductRatingSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1         

