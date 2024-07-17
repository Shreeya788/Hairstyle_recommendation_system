from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import UserUpload, CustomUser

class UserLoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)

class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password1', 'password2']

class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = UserUpload
        fields = ['image']

class HairLengthForm(forms.Form):
    HAIR_LENGTH_CHOICES = [
        ('short', 'Short'),
        ('updo', 'Updo'),
        ('long', 'Long'),
    ]
    hair_length = forms.ChoiceField(choices=HAIR_LENGTH_CHOICES)