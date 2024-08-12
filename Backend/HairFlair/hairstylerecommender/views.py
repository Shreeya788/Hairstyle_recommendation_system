from django.shortcuts import render, redirect
from django.core.files.storage import default_storage
from .forms import ImageUploadForm, HairLengthForm, UserLoginForm, UserRegistrationForm
from .models import UserUpload, Recommendation, CustomUser
from .ml_utils import predict_face_shape, recommend_hairstyles
import cv2
import numpy as np
from django.conf import settings
import os
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer, UserUploadSerializer, RecommendationSerializer
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, parser_classes, permission_classes
@api_view(['POST'])
def user_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(request, username=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        serializer = CustomUserSerializer(user)  # Updated to use CustomUserSerializer
        print( serializer.data)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data
        })
    return Response({'error': 'Invalid credentials'}, status=400)

def user_logout(request):
    logout(request)
    return redirect('login')

def user_register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('upload_image')
    else:
        form = UserRegistrationForm()
    return render(request, 'hairstylerecommender/register.html', {'form': form})

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def upload_image(request):
    image = request.FILES.get('image')
    hair_length = request.data.get('hair_length')

    if not image or not hair_length:
        return Response({'error': 'Image and hair length are required.'}, status=400)

    user_upload = UserUpload.objects.create(user=request.user, image=image)
    
    # Process the image
    image_array = cv2.imdecode(np.fromstring(user_upload.image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    face_shape = predict_face_shape(image_array)
    
    if face_shape:
        recommended_styles = recommend_hairstyles(face_shape, hair_length)
        recommendation = Recommendation.objects.create(
            user_upload=user_upload,
            face_shape=face_shape,
            hair_length=hair_length,
            recommended_styles=recommended_styles
        )
        return Response({
            'face_shape': face_shape,
            'recommended_styles': recommended_styles
        })
    else:
        return Response({'error': 'No face detected in the image.'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    image = request.FILES.get('image')
    hair_length = request.data.get('hair_length')

    if not image or not hair_length:
        return Response({'error': 'Image and hair length are required.'}, status=400)

    user_upload = UserUpload.objects.create(user=request.user, image=image)
    
    # Process the image
    image_array = cv2.imdecode(np.fromstring(user_upload.image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    face_shape = predict_face_shape(image_array)
    
    if face_shape:
        recommended_styles = recommend_hairstyles(face_shape, hair_length)
        
        # Convert relative paths to full URLs
        base_url = request.build_absolute_uri('/')[:-1]  # Get base URL of the site
        media_url = settings.MEDIA_URL
        full_urls = [f"{base_url}{media_url}rec_pics/{face_shape}/{hair_length}/{style}" for style in recommended_styles]
        
        recommendation = Recommendation.objects.create(
            user_upload=user_upload,
            face_shape=face_shape,
            hair_length=hair_length,
            recommended_styles=full_urls  # Store full URLs
        )
        return Response({
            'face_shape': face_shape,
            'recommended_styles': full_urls
        })
    else:
        return Response({'error': 'No face detected in the image.'}, status=400)

@login_required(login_url='login')
def hair_length(request, upload_id):
    user_upload = UserUpload.objects.get(id=upload_id)
    if request.method == 'POST':
        form = HairLengthForm(request.POST)
        if form.is_valid():
            hair_length = form.cleaned_data['hair_length']
            image = cv2.imdecode(np.fromstring(user_upload.image.read(), np.uint8), cv2.IMREAD_UNCHANGED)
            face_shape = predict_face_shape(image)
            if face_shape:
                recommended_styles = recommend_hairstyles(face_shape, hair_length)
                recommendation = Recommendation.objects.create(
                    user_upload=user_upload,
                    face_shape=face_shape,
                    hair_length=hair_length,
                    recommended_styles=recommended_styles
                )
                return redirect('results', recommendation_id=recommendation.id)
            else:
                return render(request, 'hairstylerecommender/error.html', {'message': 'No face detected in the image.'})
    else:
        form = HairLengthForm()
    return render(request, 'hairstylerecommender/hair_length.html', {'form': form})

@login_required(login_url='login')
def results(request, recommendation_id):
    recommendation = Recommendation.objects.get(id=recommendation_id)
    recommended_styles = [os.path.join('rec_pics', recommendation.face_shape, recommendation.hair_length, style) for style in recommendation.recommended_styles]
    context = {
        'face_shape': recommendation.face_shape,
        'hair_length': recommendation.hair_length,
        'recommended_styles': recommended_styles,
    }
    return render(request, 'hairstylerecommender/results.html', context)

class UserUploadViewSet(viewsets.ModelViewSet):
    queryset = UserUpload.objects.all()
    serializer_class = UserUploadSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        upload = serializer.save(user=self.request.user)
        image = upload.image
        face_shape = predict_face_shape(image)
        hair_length = self.request.data.get('hair_length')
        recommended_styles = recommend_hairstyles(face_shape, hair_length)
        Recommendation.objects.create(
            user_upload=upload,
            face_shape=face_shape,
            hair_length=hair_length,
            recommended_styles=recommended_styles
        )

class RecommendationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Recommendation.objects.filter(user_upload__user=self.request.user)

@api_view(['POST'])
def register_user(request):
    serializer = CustomUserSerializer(data=request.POST)
    if serializer.is_valid():
        user = serializer.save()
        login(request, user)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    serializer = CustomUserSerializer(request.user)  # Updated to use CustomUserSerializer
    return Response(serializer.data)