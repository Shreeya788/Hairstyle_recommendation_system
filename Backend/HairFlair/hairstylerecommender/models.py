from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class UserUpload(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    image = models.ImageField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Recommendation(models.Model):
    user_upload = models.ForeignKey(UserUpload, on_delete=models.CASCADE)
    face_shape = models.CharField(max_length=50)
    hair_length = models.CharField(max_length=50)
    recommended_styles = models.JSONField()