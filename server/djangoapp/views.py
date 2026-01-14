from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
import json

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

# TÂCHE 5 : Login avec cURL
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

# TÂCHE 6 : Logout avec cURL
def logout_user(request):
    """Logout endpoint"""
    logout(request)
    return JsonResponse({"userName": ""})

# TÂCHE 7 : Registration
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
        # Check if user already exists
        User.objects.get(username=username)
        return JsonResponse({"userName": username, "error": "Already Registered"})
    except User.DoesNotExist:
        # Create new user
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        login(request, user)
        return JsonResponse({"userName": username, "status": "Authenticated"})