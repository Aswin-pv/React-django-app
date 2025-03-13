from .models import CustomUser
from rest_framework.exceptions import ValidationError
from rest_framework import generics
from customers.models import Customer
from django.contrib.auth import authenticate
from . import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.middleware import csrf
from rest_framework.exceptions import AuthenticationFailed


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer

#get refresh and access token for user
def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


#REGISTER NEW VENDOR
class VendorRegisterView(APIView):

    def post(self, request):
        serializer = serializers.VendorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
                
            response = {
                'success': True,
                'user': data,
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)

#VENDOR SINGIN
class VendorLoginView(APIView):
    def post(self, request):
        data = request.data
        serializer = serializers.UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            
            user = serializer.validated_data['user']
            print("vendor serializer")
            response = Response()
            
            #if there is user get token for user
            if user is not None:
                if user.is_active:
                    #generate an access token and refresh token for the user
                    data = get_token_for_user(user)
                    print("from venorlogin view")
                    #sets the JWT access token in a secure HTTP-only cookie
                    response.set_cookie(
                                    key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                                    value = data["access"],
                                    path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
                                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                                    secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                                    samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                
                       )
      
                    # generates a CSRF token for the session, which is used to protect forms from CSRF attacks
                    csrf.get_token(request)
                  
                    # Set refresh token in HttpOnly cookie
                    response.set_cookie(
                    key='refresh_token',
                    value=data['refresh'],
                    path='/',
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                )
                    
                    # Check if the user is a vendor
                    is_vendor = hasattr(user, 'vendor')
                    print(is_vendor)

                    response.data = {
                        'role': 'vendor' if is_vendor else 'customer'
                    }
                    
                    return response
                else:
                    return Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"Invalid" : "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=400)  # Return validation errors


#VENDOR LOGOUT 
class VendorLogoutView(APIView):

    def post(self, request):
  
        try:
            # Access the refresh token from HttpOnly cookie
            refresh_token = request.COOKIES.get('refresh_token')
       
            if not refresh_token:
                raise AuthenticationFailed("Refresh token not found in cookies")

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            
            response = Response({
                "message": "Logout successful"
            }, status=status.HTTP_205_RESET_CONTENT)

            # Clear cookies by setting them to empty
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            response.delete_cookie('csrftoken')

            return response

        except Exception as e:

            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



#Register new customer
class CustomerRegisterView(APIView):
    def post(self, request):
        serializer = serializers.CustomerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            response = {
                'success': True,
                'user': serializer.data,
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)



class CustomerLoginView(APIView):
    def post(self, request):
        print("customer login view activating.....")
        data = request.data
        serializer = serializers.UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            
            user = serializer.validated_data['user']

            response = Response()
            
            #if there is user get token for user
            if user is not None:
                if user.is_active:
                    #generate an access token and refresh token for the user
                    data = get_token_for_user(user)

                    #sets the JWT access token in a secure HTTP-only cookie
                    response.set_cookie(
                                    key = settings.SIMPLE_JWT['AUTH_COOKIE'], 
                                    value = data["access"],
                                    path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
                                    expires = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                                    secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                                    httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                                    samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                
                       )
      
                    # generates a CSRF token for the session, which is used to protect forms from CSRF attacks
                    csrf.get_token(request)
                  
                    # Set refresh token in HttpOnly cookie
                    response.set_cookie(
                    key='refresh_token',
                    value=data['refresh'],
                    path='/',
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                )
                    
                    # Check if the user is a customer
                    is_customer = hasattr(user, 'customer')
                    print(is_customer)
                    
                    response.data = {
                        'role': 'customer' if is_customer else 'vendor'
                    }
                    
                    return response
                else:
                    return Response({"No active" : "This account is not active!!"}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({"Invalid" : "Invalid username or password!!"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=400)  # Return validation errors


class CustomerLogoutView(APIView):
     def post(self, request):
  
        try:
            # Access the refresh token from HttpOnly cookie
            refresh_token = request.COOKIES.get('refresh_token')
       
            if not refresh_token:
                raise AuthenticationFailed("Refresh token not found in cookies")

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            
            response = Response({
                "message": "Logout successful"
            }, status=status.HTTP_205_RESET_CONTENT)

            # Clear cookies by setting them to empty
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            response.delete_cookie('csrftoken')

            return response

        except Exception as e:

            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
