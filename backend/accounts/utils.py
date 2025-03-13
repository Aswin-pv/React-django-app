import random
from django.core.mail import EmailMessage
from .models import CustomUser, oneTimePassword
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

def generateOTP():
    otp = ""
    for i in range(6):
        otp += str(random.randint(1,9))
    return otp

def send_code_to_user(email):
    subject = "One time password for email verification"
    otp_code = generateOTP()
    print(otp_code)
    try:
        user = User.objects.get(email=email)
        print(user)
    except User.DoesNotExist:
        print('User not found')
        return
    email_body = f"Hi, thanks for signing up. please verify you email with one time password {otp_code}"  
    from_email = settings.DEFAULT_FROM_EMAIL

    oneTimePassword.objects.create(user=user, code=otp_code)
    
    send_email = EmailMessage(subject=subject, body=email_body, from_email=from_email, to=[email])
    send_email.send(fail_silently=False)
    print("Process done ")