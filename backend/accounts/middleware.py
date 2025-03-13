# from datetime import datetime
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.conf import settings
# from django.utils.deprecation import MiddlewareMixin
# from django.http import JsonResponse
# import jwt

# class TokenRefreshMiddleware(MiddlewareMixin):
#     def process_request(self, request):
                
#         if request.path.startswith('/admin/'):
#             return None  # Skip token processing for admin path
        
#         print("-----Entering middleware process request-----")
#         access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
#         refresh_token = request.COOKIES.get('refresh_token')

#         print("Access Token:", access_token)
#         print("Refresh Token:", refresh_token)

#         if access_token:
#             print("ACCESS TOKEN CHECK")
#             try:
#                 # Decode the access token to check expiry
#                 decoded_access_token = jwt.decode(
#                     access_token,
#                     settings.SECRET_KEY,
#                     algorithms=["HS256"],
#                     options={"verify_signature": False}
#                 )

#                 # Check if the access token has expired
#                 exp_timestamp = decoded_access_token.get('exp')
#                 if exp_timestamp and datetime.utcfromtimestamp(exp_timestamp) < datetime.utcnow():
#                     print("Access token expired, attempting to refresh with refresh token")
#                     # Access token expired, try refreshing
#                     new_access_token = self.refresh_access_token(refresh_token)
#                     if new_access_token:
#                         # Set new token in request and response
#                         request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'
#                         request.new_access_token = new_access_token
#                     else:
#                         return JsonResponse({'error': 'Token refresh failed'}, status=401)
#             except jwt.ExpiredSignatureError:
#                 print("Access token expired")
#                 return JsonResponse({'error': 'Access token expired'}, status=401)
#             except jwt.InvalidTokenError:
#                 print("Invalid access token")
#                 return JsonResponse({'error': 'Invalid access token'}, status=401)

#         elif refresh_token:
#             print("Access token missing; using refresh token to generate a new access token")
#             new_access_token = self.refresh_access_token(refresh_token)
#             if new_access_token:
#                 # Set new token in request and response
#                 request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'
#                 request.new_access_token = new_access_token
#             else:
#                 return JsonResponse({'error': 'Token refresh failed'}, status=401)
#         else:
#             return JsonResponse({'error': 'No valid access or refresh token found'}, status=401)

#         return None

#     def process_response(self, request, response):

#         print("Processing response for token update")
#         # If a new access token was generated, set it in the response cookies
#         if hasattr(request, 'new_access_token'):
#             print("Setting new access token in response cookies")
#             response.set_cookie(
#                 key=settings.SIMPLE_JWT['AUTH_COOKIE'],
#                 value=request.new_access_token,
#                 path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
#                 max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),
#                 secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
#                 httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
#                 samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
#             )
#         return response

#     def refresh_access_token(self, refresh_token):
#         try:
#             refresh = RefreshToken(refresh_token)
#             new_access_token = refresh.access_token
#             print("Successfully refreshed access token")
#             return str(new_access_token)
#         except Exception as e:
#             print(f"Error refreshing token: {e}")
#             return None
