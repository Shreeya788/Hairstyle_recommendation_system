from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'uploads', views.UserUploadViewSet)
router.register(r'recommendations', views.RecommendationViewSet)

urlpatterns = [
    path('', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_register, name='register'),
    # path('upload/', views.upload_image, name='upload_image'),
    path('hair_length/<int:upload_id>/', views.hair_length, name='hair_length'),
    path('results/<int:recommendation_id>/', views.results, name='results'),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.register_user, name='registerUser'),
    path('api/signIn/', views.user_login, name='user_login'),
    path('api/user-info/', views.get_user_info, name='user_info'),
    path('api/upload_image/', views.upload_image, name='upload_image'),
]