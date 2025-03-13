from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework import status
from . import serializers
import json
from .models import WishList
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from accounts.authenticate import CustomAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response



class WishListView(generics.ListCreateAPIView):
    queryset = WishList.objects.all()
    serializer_class = serializers.WishListSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([CustomAuthentication])
def check_product_in_wishlist(request, product_id):
    print("checklist view runngin")
    try:
        customer = request.user.customer
        # Check if the product is in the wishlist for this customer
        exists = WishList.objects.filter(product_id=product_id, customer=customer).exists()
        return Response({'in_wishlist': exists}, status=status.HTTP_200_OK)
    except AttributeError:
        return Response({'error': 'Customer not found for user'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#Wishlist items
class WishItemList(generics.ListAPIView):
    queryset = WishList.objects.all()
    serializer_class = serializers.WishListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(customer__id=customer_id)
        return qs

# Remove item from wishlist
@csrf_exempt
def remove_from_wishlist(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        wishlist_id = data['wishlist_id']
  
        removed_item = WishList.objects.filter(id=wishlist_id).delete()
        msg = {
            'bool':False
        }

        if removed_item:
            msg = {
            'bool':True
        }
        
        return JsonResponse(msg)