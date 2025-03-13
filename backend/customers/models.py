from django.db import models
from accounts.models import CustomUser


#Customer model
class Customer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,related_name='customer')
    mobile = models.PositiveBigIntegerField(unique=True)
    profile_img = models.ImageField(upload_to='customer_images/', blank=True,null=True)

    def __str__(self) -> str:
        return self.user.email
    
#Customer address model    
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_address')
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Customer Address'

    def __str__(self) -> str:
        return self.address
    

class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey('products.Product',on_delete=models.CASCADE)
    quantity = models.IntegerField()
    is_active = models.BooleanField(default=True)
    date_added = models.DateField(auto_now_add=True)

    def sub_total(self):
        return self.product.price * self.quantity
    
    def __str__(self) -> str:
        return self.product.title