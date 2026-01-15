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
    
    # API endpoints
    path('get_cars/', views.get_cars, name='get_cars'),
    path('get_dealerships/', views.get_dealerships, name='get_dealerships'),
    path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    path('reviews/dealer/<int:dealer_id>/', views.get_dealer_reviews, name='dealer_reviews'),
    path('add_review/', views.add_review, name='add_review'),
    path('get_cars/', views.get_cars, name='get_cars'),
    path('get_all_carmakes/', views.get_all_carmakes, name='get_all_carmakes'),
    path('analyze_sentiment/', views.analyze_sentiment, name='analyze_sentiment'),
    path('fetchDealers', views.fetch_dealers, name='fetch_dealers'),
    path('fetchDealer/<int:dealer_id>', views.fetch_dealer, name='fetch_dealer'),
    path('fetchDealers/<str:state>', views.fetch_dealers_by_state, name='fetch_dealers_by_state'),
    path('analyze/<str:review_text>', views.analyze_review, name='analyze_review'),
]