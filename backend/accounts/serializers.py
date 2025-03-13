from rest_framework import serializers
from .models import CustomUser
from vendors.models import Vendor
from django.contrib.auth.password_validation import validate_password
from customers.models import Customer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

#getting the user model from auth
User = get_user_model()

#User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name','email']


#Created a BaseSerializer for both customer and vendor (Register and login).
class BaseUserRegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})

        # Check if email already exists
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'email': 'Email already exists'})

        return data

    def validate_password(self, password):
        validate_password(password)
        return password

    def create_user(self, validated_data):
        # Remove password2 as it's not needed for user creation
        validated_data.pop('password2')
        password = validated_data.pop('password')

        # Create the user
        user = CustomUser.objects.create(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
        )

        # Set the password
        user.set_password(password)
        user.save()
        return user


#Vendor Register Serializer
class VendorRegisterSerializer(BaseUserRegisterSerializer):
    mobile = serializers.CharField(required=True, max_length=10)
    address = serializers.CharField(required=True)

    def create(self, validated_data):
        # Create the user
        user = self.create_user(validated_data)

        # Create the vendor
        vendor = Vendor.objects.create(
            user=user,
            mobile=validated_data.get('mobile'),
            address=validated_data.get('address')
        )
        vendor.save()

        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'mobile': vendor.mobile,
            'address': vendor.address
        }


#Customer Register Serializer
class CustomerRegisterSerializer(BaseUserRegisterSerializer):
    mobile = serializers.CharField(required=True, max_length=10)


    def create(self, validated_data):
        # Create the user
        user = self.create_user(validated_data)

        # Create the customer
        customer = Customer.objects.create(
            user=user,
            mobile=validated_data.get('mobile')
        )

        return {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'mobile': customer.mobile
        }

#Login serializer for both customer and vendor
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(username=email, password=password)

            if not user:
                raise serializers.ValidationError("Invalid email or password")
            if not user.is_active:
                raise serializers.ValidationError("This account is inactive")
        else:
            raise serializers.ValidationError("Both email and password are required")

        data['user'] = user
        return data
