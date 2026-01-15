# Full-Stack Car Dealership Application

## Project Information
- **Repository Name:** car-dealership-fullstack
- **Project Name:** Best Cars - Full Stack Dealership Platform
- **Developer:** Meryem El Herhari
- **Course:** IBM Full Stack Software Developer Professional Certificate
- **Institution:** IBM Skills Network

## Description
A comprehensive full-stack web application for a car dealership that allows users to:
- Browse dealerships by location
- View car inventory with detailed specifications
- Register and authenticate users
- Post and read dealership reviews
- Analyze review sentiment using IBM Watson NLP

## Technology Stack

### Backend
- **Django 4.2.7** - Python web framework
- **Django REST Framework** - API development
- **SQLite** - Database for Django models
- **Python 3.10** - Programming language

### Microservices
- **Node.js + Express** - Review microservice
- **MongoDB** - Reviews database

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client

### AI/ML
- **IBM Watson NLP** - Sentiment analysis

### DevOps
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization
- **IBM Cloud Code Engine** - Deployment

## Features
✅ User authentication (register, login, logout)  
✅ Browse dealerships with filtering by state  
✅ View detailed dealer information  
✅ Read customer reviews  
✅ Post new reviews with car purchase details  
✅ AI-powered sentiment analysis on reviews  
✅ Admin panel for managing cars and dealers  
✅ RESTful APIs for all operations  
✅ Responsive design  
✅ Automated testing  
✅ Continuous integration and deployment  

## Architecture
```
car-dealership-fullstack/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Dealers/    # Dealer listing & details
│   │   │   ├── Login/      # Authentication
│   │   │   └── Register/   # User registration
│   │   └── App.js          # Main app component
│   └── package.json
├── server/                   # Django backend
│   ├── djangoapp/           # Main Django app
│   │   ├── models.py       # CarMake & CarModel models
│   │   ├── views.py        # API endpoints
│   │   ├── admin.py        # Admin configuration
│   │   └── restapis.py     # Watson NLP integration
│   ├── djangobackend/       # Django project settings
│   └── manage.py
├── functions/               # Node.js microservices
│   └── sample/nodejs/
│       ├── server.js       # Express server
│       └── dealerships.json # Dealer data
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # GitHub Actions workflow
└── README.md
```

## Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js 20+
- npm 10+
- Git

### Backend Setup
```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

### Microservice Setup
```bash
# Navigate to Node.js directory
cd functions/sample/nodejs

# Install dependencies
npm install

# Start Node.js server
node server.js
```

## API Endpoints

### Authentication
- `POST /djangoapp/login/` - User login
- `GET /djangoapp/logout/` - User logout
- `POST /djangoapp/registration/` - User registration

### Dealers
- `GET /djangoapp/get_dealerships/` - Get all dealerships
- `GET /djangoapp/dealer/<id>/` - Get dealer by ID
- `GET /djangoapp/fetchDealers/<state>/` - Get dealers by state

### Reviews
- `GET /djangoapp/reviews/dealer/<id>/` - Get reviews for dealer
- `POST /djangoapp/add_review/` - Add new review

### Cars
- `GET /djangoapp/get_cars/` - Get all car models

### Sentiment Analysis
- `GET /djangoapp/analyze/<text>/` - Analyze sentiment of text

## Testing
```bash
# Run Django tests
cd server
python manage.py test

# Run React tests
cd frontend
npm test
```

## Deployment

### Local Development
```bash
# Start all services
# Terminal 1: Django
cd server && python manage.py runserver

# Terminal 2: React
cd frontend && npm start

# Terminal 3: Node.js
cd functions/sample/nodejs && node server.js
```

### Production Deployment
- Deployed on **IBM Cloud Code Engine**
- CI/CD via **GitHub Actions**
- Automated builds and deployments on push to main branch

## Screenshots

### Home Page
![Dealers Listing](docs/screenshots/dealers.png)

### Dealer Details with Reviews
![Dealer Details](docs/screenshots/dealer-details.png)

### Post Review
![Post Review](docs/screenshots/post-review.png)

### Admin Panel
![Admin Panel](docs/screenshots/admin.png)

## CI/CD Pipeline
- **Linting:** Python (flake8) and JavaScript (ESLint)
- **Testing:** Django unit tests and React tests
- **Building:** React production build
- **Deployment:** Automated deployment to IBM Cloud Code Engine

## Project Timeline
- **Week 1-2:** Backend development (Django models, APIs)
- **Week 3:** Microservices (Node.js + Express)
- **Week 4-5:** Frontend development (React components)
- **Week 6:** Watson NLP integration
- **Week 7:** CI/CD setup and deployment
- **Week 8:** Testing and documentation

## Challenges & Solutions
1. **CORS Issues:** Resolved by configuring django-cors-headers
2. **Sentiment Analysis:** Integrated IBM Watson NLP API
3. **State Management:** Used React hooks for efficient state handling
4. **Deployment:** Containerized with Docker for consistent environments

## Future Enhancements
- [ ] Add car comparison feature
- [ ] Implement real-time chat with dealers
- [ ] Add map integration for dealer locations
- [ ] Enable image uploads for reviews
- [ ] Add more advanced filtering options
- [ ] Implement favorites/bookmarks
- [ ] Add email notifications

## License
MIT License

## Contact
- **Email:** elherharimeryem@gmail.com
- **GitHub:** [@elherhari](https://github.com/elherhari)
- **LinkedIn:** [Meryem El Herhari](https://linkedin.com/in/meryem-elherhari)

## Acknowledgments
- IBM Skills Network for the project framework
- Course instructors and mentors
- OpenAI for development assistance
- React and Django communities

## Course Information
This project was developed as part of the **IBM Full Stack Software Developer Professional Certificate** capstone project.

**Completed:** January 2026