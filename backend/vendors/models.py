from django.db import models
from accounts.models import CustomUser
from django.core.validators import RegexValidator



# Create your models here.
#vendor model
class Vendor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,related_name='vendor')
    address = models.TextField(null=True,unique=True,validators=[RegexValidator(
                            regex=r"^\d{10}", message="Phone number must be 10 digits only.")])
    mobile = models.CharField(max_length=15, default='')
    profile_img = models.ImageField(upload_to='seller_img/', blank=True,null=True)

    def __str__(self) -> str:
        return self.user.first_name
    

    # fetch daily data for chart
    # @property
    # def show_daily_order_chart(self):
    #     orders = OrderItem.objects.filter(product__vendor=self).values('order__order_time__date').annotate(Count('id'))
    #     dateList = []
    #     countList = []
    #     dataSet = {}
    #     if orders:
    #         for order in orders:
    #             dateList.append(order['order__order_time__date'])
    #             countList.append(order['id__count'])
    #     dataSet = {
    #         'dates':dateList,
    #         'data':countList,
    #     }        
    #     return dataSet
    
    # #fetch monthly data for chart
    # @property
    # def show_monthly_order_chart(self):
      
    #     orders = OrderItem.objects.filter(product__vendor=self).values('order__order_time__month').annotate(Count('id'))
    #     dateList = []
    #     countList = []
    #     dataSet = {}
    #     if orders:
    #         for order in orders:
    #             monthinteger = 4
    #             month = datetime.date(1900, monthinteger, 1).strftime('%B')
    #             dateList.append(month)
    #             countList.append(order['id__count'])
    #     dataSet = {
    #         'dates':dateList,
    #         'data':countList,
    #     }        
    #     return dataSet
    
    # #fetch yearly data for chart
    # @property
    # def show_yearly_order_chart(self):
  
    #     orders = OrderItem.objects.filter(product__vendor=self).values('order__order_time__year').annotate(Count('id'))
    #     dateList = []
    #     countList = []
    #     dataSet = {}
    #     if orders:
    #         for order in orders:
    #             dateList.append(order['order__order_time__year'])
    #             countList.append(order['id__count'])
    #     dataSet = {
    #         'dates':dateList,
    #         'data':countList,
    #     }        
    #     return dataSet
