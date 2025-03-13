from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.conf import settings
from django.middleware.csrf import get_token, CsrfViewMiddleware
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


# Dummy get_response function for the CSRF check
def dummy_get_response(request):
    return None

def enforce_csrf(request):
    print("enforce csrf check")
    check = CsrfViewMiddleware(dummy_get_response)
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    
    if reason:
        print("CSRF verification failed")
        raise exceptions.PermissionDenied(f'CSRF Failed: {reason}')

class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)
        
        print("Attempting custom authentication")
        if header is None:
            # Get access token from cookie
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE']) or None
            print("Raw token from cookie:", raw_token)
        else:
            raw_token = self.get_raw_token(header)
            print("Raw token from header:", raw_token)
          
        if raw_token is None:
            print("No token found",'token expired ,please login again')

            return None
        
        try:
            #Validate the token
            validated_token = self.get_validated_token(raw_token)
            print("validated token",validated_token)
        except (InvalidToken, TokenError) as e:
            #If the token is invalid or expired then check for refreshtoken
            print("Token validation failed:", str(e))
            refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['REFRESH_COOKIE'])
            if not refresh_token:
                print('Session Expired')
                return None
            
            try:
                refresh_token_obj = RefreshToken(refresh_token)
                validated_token = refresh_token_obj.access_token
                request.COOKIES[settings.SIMPLE_JWT['AUTH_COOKIE']] = str(validated_token)
                print("New access token created from refresh token")
            except exceptions.AuthenticationFailed:
                print("Refresh token is invalid or expired")
                return None
        

        # Enforce CSRF for session-based requests
        enforce_csrf(request)

        return self.get_user(validated_token), validated_token
