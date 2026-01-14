import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostReview.css';

const PostReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    purchase: false,
    review: '',
    purchase_date: '',
    car_make: '',
    car_model: '',
    car_year: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    if (!username) {
      alert('Please login to post a review');
      navigate('/dealers');
      return;
    }

    setFormData(prev => ({ ...prev, name: username }));

    // Fetch dealer details
    fetch(`http://localhost:8000/djangoapp/dealer/${id}/`)
      .then(response => response.json())
      .then(data => setDealer(data))
      .catch(error => console.error('Error:', error));

    // Fetch available cars
    fetch('http://localhost:8000/djangoapp/get_cars/')
      .then(response => response.json())
      .then(data => setCars(data.CarModels || []))
      .catch(error => console.error('Error:', error));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      ...formData,
      dealership: parseInt(id)
    };

    try {
      const response = await fetch('http://localhost:8000/djangoapp/add_review/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        alert('Review posted successfully!');
        navigate(`/dealer/${id}`);
      } else {
        alert('Error posting review');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error posting review');
    }
  };

  return (
    <div className="post-review-container">
      <div className="review-form-card">
        <h1>✍️ Write a Review</h1>
        <p style={{textAlign: 'center', color: '#666'}}>for {dealer?.full_name}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              readOnly
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="purchase"
              checked={formData.purchase}
              onChange={(e) => setFormData({...formData, purchase: e.target.checked})}
            />
            <label htmlFor="purchase">I made a purchase</label>
          </div>

          {formData.purchase && (
            <>
              <div className="form-group">
                <label>Purchase Date *</label>
                <input
                  type="date"
                  value={formData.purchase_date}
                  onChange={(e) => setFormData({...formData, purchase_date: e.target.value})}
                  required={formData.purchase}
                />
              </div>

              <div className="form-group">
                <label>Car Make *</label>
                <select
                  value={formData.car_make}
                  onChange={(e) => setFormData({...formData, car_make: e.target.value, car_model: '', car_year: ''})}
                  required={formData.purchase}
                >
                  <option value="">Select Make</option>
                  {[...new Set(cars.map(c => c.make))].map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Car Model *</label>
                <select
                  value={formData.car_model}
                  onChange={(e) => setFormData({...formData, car_model: e.target.value})}
                  required={formData.purchase}
                  disabled={!formData.car_make}
                >
                  <option value="">Select Model</option>
                  {cars
                    .filter(c => c.make === formData.car_make)
                    .map(car => (
                      <option key={car.id} value={car.name}>{car.name}</option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label>Year *</label>
                <select
                  value={formData.car_year}
                  onChange={(e) => setFormData({...formData, car_year: e.target.value})}
                  required={formData.purchase}
                  disabled={!formData.car_model}
                >
                  <option value="">Select Year</option>
                  {cars
                    .filter(c => c.make === formData.car_make && c.name === formData.car_model)
                    .map(car => (
                      <option key={car.id} value={car.year}>{car.year}</option>
                    ))}
                </select>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Your Review *</label>
            <textarea
              value={formData.review}
              onChange={(e) => setFormData({...formData, review: e.target.value})}
              required
              placeholder="Share your experience with this dealership..."
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Review
          </button>
          
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate(`/dealer/${id}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostReview;