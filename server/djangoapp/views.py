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
        # Handle contact form submission
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        # In a real app, you would send an email or save to database
        context['message'] = f'Thank you {name}! We have received your message and will respond to {email} shortly.'
    
    return render(request, 'contact.html', context)

def get_cars(request):
    """API endpoint for cars - to be implemented"""
    return JsonResponse({"cars": []})