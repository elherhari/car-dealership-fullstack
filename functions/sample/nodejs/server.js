const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

// Load dealerships data
const dealershipsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'dealerships.json'), 'utf8')
);

// Mock reviews database
const reviewsDB = [
  {
    id: 1,
    dealership: 1,
    name: "John Doe",
    purchase: true,
    review: "Great experience! The staff was very helpful and professional.",
    purchase_date: "2024-01-15",
    car_make: "Toyota",
    car_model: "Camry",
    car_year: 2023,
    sentiment: "positive"
  },
  {
    id: 2,
    dealership: 1,
    name: "Jane Smith",
    purchase: true,
    review: "Good service, but prices could be better.",
    purchase_date: "2024-02-10",
    car_make: "Honda",
    car_model: "Accord",
    car_year: 2023,
    sentiment: "neutral"
  },
  {
    id: 3,
    dealership: 2,
    name: "Bob Johnson",
    purchase: false,
    review: "Visited but didn't buy. Staff seemed disinterested.",
    purchase_date: null,
    car_make: null,
    car_model: null,
    car_year: null,
    sentiment: "negative"
  },
  {
    id: 4,
    dealership: 3,
    name: "Alice Williams",
    purchase: true,
    review: "Excellent dealership! Found exactly what I wanted.",
    purchase_date: "2024-03-05",
    car_make: "Ford",
    car_model: "F-150",
    car_year: 2024,
    sentiment: "positive"
  }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Dealership API is running', version: '1.0' });
});

// TÂCHE 8: Get reviews for a dealer
app.get('/reviews/dealer/:id', (req, res) => {
  const dealerId = parseInt(req.params.id);
  const reviews = reviewsDB.filter(r => r.dealership === dealerId);
  res.json(reviews);
});

// TÂCHE 9: Get all dealerships
app.get('/dealerships/get', (req, res) => {
  res.json(dealershipsData.dealerships);
});

// TÂCHE 10: Get dealership by ID
app.get('/dealerships/dealer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dealer = dealershipsData.dealerships.find(d => d.id === id);
  
  if (dealer) {
    res.json(dealer);
  } else {
    res.status(404).json({ error: 'Dealer not found' });
  }
});

// TÂCHE 11: Get dealerships by state
app.get('/dealerships/state/:state', (req, res) => {
  const state = req.params.state;
  const dealers = dealershipsData.dealerships.filter(
    d => d.state.toLowerCase() === state.toLowerCase()
  );
  res.json(dealers);
});

app.listen(PORT, () => {
  console.log(`Dealership API listening on port ${PORT}`);
  console.log(`Test: http://localhost:${PORT}/dealerships/get`);
});