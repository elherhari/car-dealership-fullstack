import requests
import json

def analyze_review_sentiments(text):
    """
    Analyze sentiment of a review using Watson NLP
    Returns: sentiment label (positive, neutral, negative)
    """
    # Watson NLP API endpoint (mock for now)
    # In production, this would call IBM Watson NLP API
    
    # Simple sentiment analysis based on keywords
    text_lower = text.lower()
    
    positive_words = ['great', 'excellent', 'amazing', 'wonderful', 'fantastic', 
                      'love', 'best', 'good', 'happy', 'satisfied', 'professional']
    negative_words = ['bad', 'terrible', 'horrible', 'worst', 'awful', 'poor',
                      'disappointed', 'sad', 'angry', 'frustrated', 'disinterested']
    
    positive_count = sum(1 for word in positive_words if word in text_lower)
    negative_count = sum(1 for word in negative_words if word in text_lower)
    
    if positive_count > negative_count:
        return 'positive'
    elif negative_count > positive_count:
        return 'negative'
    else:
        return 'neutral'

def post_review(data_dict):
    """
    Post a review to the Node.js backend
    """
    request_url = "http://localhost:3030/reviews/add"
    try:
        response = requests.post(request_url, json=data_dict)
        return response.json()
    except:
        return {"error": "Network error"}