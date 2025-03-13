from rest_framework.routers import DefaultRouter
from . import views

app_name = 'categories'

router = DefaultRouter()
router.register('', views.CategoryList, basename='categories')
urlpatterns = router.urls
