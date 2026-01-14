from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from .models import CarMake, CarModel
from .restapis import analyze_review_sentiments, post_review
import json
import requests

def about(request):
    """Page About Us"""
    return render(request, 'about.html')

def contact(request):
    """Page Contact Us"""
    context = {}
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        context['message'] = f'Thank you {name}! We have received your message and will respond to {email} shortly.'
    return render(request, 'contact.html', context)

@csrf_exempt
def login_user(request):
    """Login endpoint"""
    data = json.loads(request.body)
    username = data.get('userName')
    password = data.get('password')
    
    user = authenticate(username=username, password=password)
    response_data = {"userName": username}
    
    if user is not None:
        login(request, user)
        response_data["status"] = "Authenticated"
    else:
        response_data["status"] = "Authentication failed"
    
    return JsonResponse(response_data)

def logout_user(request):
    """Logout endpoint"""
    logout(request)
    return JsonResponse({"userName": ""})

@csrf_exempt
def registration(request):
    """Registration endpoint"""
    data = json.loads(request.body)
    username = data.get('userName')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    
    try:
        User.objects.get(username=username)
        return JsonResponse({"userName": username, "error": "Already Registered"})
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        login(request, user)
        return JsonResponse({"userName": username, "status": "Authenticated"})

def get_cars(request):
    """Get all car models"""
    if CarModel.objects.count() == 0:
        return JsonResponse({"CarModels": []})
    
    car_models = CarModel.objects.select_related('car_make').all()
    cars_list = []
    
    for car in car_models:
        cars_list.append({
            "id": car.id,
            "name": car.name,
            "make": car.car_make.name,
            "type": car.type,
            "year": car.year,
            "dealer_id": car.dealer_id
        })
    
    return JsonResponse({"CarModels": cars_list})

def get_dealerships(request):
    """Get all dealerships from Node.js API"""
    try:
        response = requests.get("http://localhost:3030/dealerships/get")
        return JsonResponse({"dealerships": response.json()})
    except:
        return JsonResponse({"dealerships": []})

def get_dealer_reviews(request, dealer_id):
    """Get reviews for a specific dealer"""
    try:
        response = requests.get(f"http://localhost:3030/reviews/dealer/{dealer_id}")
        reviews = response.json()
        
        # Add sentiment analysis to each review
        for review in reviews:
            if 'review' in review and review['review']:
                review['sentiment'] = analyze_review_sentiments(review['review'])
        
        return JsonResponse({"reviews": reviews})
    except:
        return JsonResponse({"reviews": []})

def get_dealer_details(request, dealer_id):
    """Get details for a specific dealer"""
    try:
        response = requests.get(f"http://localhost:3030/dealerships/dealer/{dealer_id}")
        return JsonResponse(response.json())
    except:
        return JsonResponse({"error": "Dealer not found"})

@csrf_exempt
def add_review(request):
    """Add a new review with sentiment analysis"""
    if request.method == 'POST':
        data = json.loads(request.body)
        
        # Analyze sentiment
        review_text = data.get('review', '')
        sentiment = analyze_review_sentiments(review_text)
        data['sentiment'] = sentiment
        
        # Post to Node.js backend
        result = post_review(data)
        return JsonResponse(result)
    
    return JsonResponse({"error": "Invalid request method"})
def get_all_carmakes(request):
    """Get all car makes with their models"""
    car_makes = CarMake.objects.prefetch_related('models').all()
    
    result = []
    for make in car_makes:
        models_list = []
        for model in make.models.all():
            models_list.append({
                "id": model.id,
                "name": model.name,
                "type": model.type,
                "year": model.year,
                "dealer_id": model.dealer_id
            })
        
        result.append({
            "id": make.id,
            "name": make.name,
            "description": make.description,
            "models": models_list
        })
    
    return JsonResponse({"CarMakes": result})
@csrf_exempt
def analyze_sentiment(request):
    """Analyze sentiment of a review text"""
    if request.method == 'POST':
        data = json.loads(request.body)
        review_text = data.get('review', '')
        
        sentiment = analyze_review_sentiments(review_text)
        
        return JsonResponse({
            "review": review_text,
            "sentiment": sentiment
        })
    
    return JsonResponse({"error": "POST method required"})