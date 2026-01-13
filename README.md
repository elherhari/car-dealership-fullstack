# Full-Stack Car Dealership Application

## Project Information
- **Repository Name:** car-dealership-fullstack
- **Project Name:** Best Cars - Full Stack Dealership Platform
- **Developer:** Meryem El Herhari
- **Course:** IBM Full Stack Software Developer Professional Certificate

## Description
A comprehensive full-stack web application for a car dealership that allows users to browse dealers, view car inventory, and post reviews with sentiment analysis.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Django (Python), Node.js + Express
- **Database:** SQLite (Django), MongoDB (Reviews)
- **AI/ML:** IBM Watson NLP for sentiment analysis
- **Deployment:** IBM Cloud Code Engine

## Features
- User authentication (login/register/logout)
- Browse dealerships by location
- View car inventory
- Post and view reviews with sentiment analysis
- Admin panel for managing cars and dealers

## Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 24+
- Git

### Backend Setup (Django)
```bash
cd server
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

### Node.js Microservice Setup
```bash
cd functions\sample\nodejs
npm install
node server.js
```

## Project Structure
```
car-dealership-fullstack/
├── server/              # Django backend
│   ├── djangobackend/
│   ├── djangoapp/
│   └── manage.py
├── frontend/            # React frontend
├── functions/           # Node.js microservices
└── README.md
```

## License
MIT License
```

### 2. .gitignore

Créez `.gitignore` à la racine :
```
# Python
venv/
__pycache__/
*.pyc
db.sqlite3

# Node
node_modules/
npm-debug.log

# React
/frontend/build

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Environment
.env
```

### 3. requirements.txt

Dans `server/`, créez `requirements.txt` :
```
Django==4.2.7
djangorestframework==3.14.0
django-cors-headers==4.3.1
Pillow==10.1.0
requests==2.31.0
gunicorn==21.2.0