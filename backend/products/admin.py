from django.contrib import admin
from .models import Product,ProductCategory,ProductImage,ProductRating


admin.site.register(ProductCategory)

admin.site.register(ProductRating)

class ProductImagesInline(admin.StackedInline):
    model = ProductImage

class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'price', 'usd_price']
    list_editable = ['usd_price']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [
        ProductImagesInline,
    ]

admin.site.register(Product,ProductAdmin)
