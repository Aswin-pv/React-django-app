from django.db import models


#product category model
class ProductCategory(models.Model):
    title = models.CharField(max_length=200)
    detail = models.TextField(null=True)    
    category_img = models.ImageField(upload_to='category_img/', blank=True,null=True)

    class Meta:
        verbose_name_plural = 'Product categories'

    def __str__(self) -> str:
        return self.title