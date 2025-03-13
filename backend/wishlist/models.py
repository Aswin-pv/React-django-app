from django.db import models
from products.models import Product
from customers.models import Customer

# Create your models here.
class WishList(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)    

    class Meta:
        verbose_name_plural = 'Wish List'

    def __str__(self) -> str:
        return f"{self.product.title} - {self.customer.user.first_name}"