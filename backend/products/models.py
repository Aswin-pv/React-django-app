from django.db import models
from django.utils.text import slugify
from categories.models import ProductCategory
from vendors.models import Vendor
from customers.models import Customer
from django.utils import timezone

#product model
class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, 
                                 related_name='category_products')
    vendor = models.ForeignKey(Vendor,on_delete=models.SET_NULL, null=True,related_name='products')
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, editable=True)  
    detail = models.TextField(null=True)  
    tags = models.TextField(null=True)
    image = models.ImageField(upload_to='product_images/', null=True) 
    price = models.DecimalField(max_digits=10, decimal_places=2)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2, default=80)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=None)
    product_file = models.FileField(upload_to='product_files/', null=True)
    published_status = models.BooleanField(default=False)
    date_added = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-price']

    def save(self, *args, **kwargs):
        #if discount percentage is set to zero by vendor , then save it as null
        if self.discount_percentage == 0:
            self.discount_percentage = None
        # Generate slug based on title if it's not set
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


    def __str__(self) -> str:
        return self.title
    
        
    def tag_list(self):
        if self.tags:
            return self.tags.split(',')
        return []  # Return an empty list if tags is None
    

#Product rating and reviews model
class ProductRating(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='rating_customers')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_ratings')
    rating = models.IntegerField()
    reviews = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.reviews} - {self.rating}"
    

#Product images Model    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_images')
    image = models.ImageField(upload_to='product_images/',null=True)

    def __str__(self) -> str:
        return self.image.url
    
