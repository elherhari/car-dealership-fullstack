from django.urls import path
from . import views

app_name = 'djangoapp'

urlpatterns = [
    # Pages statiques
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    
    # Authentification
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('registration/', views.registration, name='registration'),
]