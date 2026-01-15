# car-dealership-fullstack

## Best Cars - Full Stack Dealership Platform

A comprehensive full-stack web application for a car dealership that allows users to browse dealers, view car inventory, and post reviews with AI-powered sentiment analysis.

## Project Information

- **Repository Name:** car-dealership-fullstack
- **Project Name:** Best Cars - Full Stack Dealership Platform
- **Developer:** Meryem El Herhari
- **Course:** IBM Full Stack Software Developer Professional Certificate

## Description

Best Cars is a modern full-stack application that revolutionizes the car buying experience by providing transparent, comprehensive information about dealerships and their inventory. The platform empowers customers to make informed decisions through verified reviews with IBM Watson NLP sentiment analysis.

## Tech Stack

### Frontend
- React.js
- React Router
- Axios for API calls
- Modern CSS with gradients and animations

### Backend
- Django (Python)
- Django REST Framework
- Node.js + Express (Microservices)

### Database
- SQLite (Django)
- MongoDB (Reviews)
- In-memory storage (Node.js)

### AI/ML
- IBM Watson NLP for sentiment analysis

### Deployment
- IBM Cloud Code Engine
- GitHub Actions for CI/CD

## Features

- ✅ User authentication (login/register/logout)
- ✅ Browse dealerships by location
- ✅ Filter dealerships by state
- ✅ View detailed car inventory
- ✅ Post and view reviews with sentiment analysis
- ✅ Admin panel for managing cars and dealers
- ✅ RESTful API architecture
- ✅ Responsive design

## Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 20+
- Git

### Backend Setup (Django)
```bashcd server
python -m venv venv
Windows:
venv\Scripts\activate
Mac/Linux:
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

### Node.js Microservice Setup
```bashcd functions/sample/nodejs
npm install
node server.js

### Frontend Setup (React)
```bashcd frontend
npm install
npm start

## Project Structurecar-dealership-fullstack/
├── server/                 # Django backend
│   ├── djangobackend/      # Django project settings
│   ├── djangoapp/          # Main Django app
│   ├── frontend/           # Static HTML pages
│   │   └── static/         # About.html, Contact.html
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   └── components/
│   │       ├── Register/
│   │       └── Dealers/
│   └── package.json
├── functions/              # Node.js microservices
│   └── sample/
│       └── nodejs/
│           ├── server.js
│           ├── dealerships.json
│           └── package.json
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # GitHub Actions workflow
└── README.md

## API Endpoints

### Django Backend
- `POST /djangoapp/login/` - User login
- `GET /djangoapp/logout/` - User logout
- `POST /djangoapp/registration/` - User registration
- `GET /djangoapp/fetchDealers` - Get all dealerships
- `GET /djangoapp/fetchDealer/<id>` - Get dealer by ID
- `GET /djangoapp/fetchDealers/<state>` - Get dealers by state
- `GET /djangoapp/get_cars/` - Get all car models
- `GET /djangoapp/analyze/<text>` - Analyze sentiment
- `POST /djangoapp/add_review/` - Add a review

### Node.js Microservice
- `GET /dealerships/get` - Get all dealerships
- `GET /dealerships/dealer/:id` - Get dealer by ID
- `GET /dealerships/state/:state` - Get dealers by state
- `GET /reviews/dealer/:id` - Get reviews for a dealer
- `POST /reviews/add` - Add a new review

## CI/CD Pipeline

GitHub Actions workflow includes:
- Python linting with flake8
- JavaScript linting with ESLint
- Django migrations and tests
- React build optimization
- Automated deployment

## License

MIT License

## Contact

For questions or support, please contact: elherharimeryem@gmail.com