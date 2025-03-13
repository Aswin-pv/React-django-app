from django.db import models
from customers.models import Customer
from products.models import Product

# Create your models here.
#Order model    
class Order(models.Model):

    STATUS_CHOICES = [
        ('P', 'Pending'),
        ('C', 'Completed'),
        ('F', 'Failed'),
        ('CA', 'Cancelled'),
    ]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE,related_name='customer_orders')
    order_time = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(max_length=2, choices=STATUS_CHOICES, default='P')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_usd_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self) -> str:
        return '%s' % (self.order_time)

#order item model
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty= models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2, default=80)


    def __str__(self) -> str:
        return self.product.title

#order item model
class VendorOrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='vendor_order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty= models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2, default=80)


    def __str__(self) -> str:
        return self.product.title