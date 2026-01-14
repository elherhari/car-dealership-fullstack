import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Dealer.css';

const Dealer = () => {
  const { id } = useParams();
  const [dealer, setDealer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dealer details
    fetch(`http://localhost:8000/djangoapp/dealer/${id}/`)
      .then(response => response.json())
      .then(data => {
        setDealer(data);
      })
      .catch(error => console.error('Error:', error));

    // Fetch reviews
    fetch(`http://localhost:8000/djangoapp/reviews/dealer/${id}/`)
      .then(response => response.json())
      .then(data => {
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);

  const getSentimentClass = (sentiment) => {
    if (sentiment === 'positive') return 'positive';
    if (sentiment === 'negative') return 'negative';
    return 'neutral';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dealer-container">
      <div className="dealer-header">
        <h1>{dealer?.full_name || 'Dealer Details'}</h1>
        <a href="/dealers" className="back-link">← Back to Dealers</a>
      </div>

      {dealer && (
        <div className="dealer-info">
          <h2>📍 Location</h2>
          <p>{dealer.address}</p>
          <p>{dealer.city}, {dealer.state} {dealer.zip}</p>
        </div>
      )}

      <div className="reviews-section">
        <div className="reviews-header">
          <h2>⭐ Customer Reviews</h2>
          <a href={`/postreview/${id}`} className="post-review-btn">Write a Review</a>
        </div>

        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className={`review-card ${getSentimentClass(review.sentiment)}`}>
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <span className={`sentiment-badge ${review.sentiment}`}>
                    {review.sentiment}
                  </span>
                </div>
                <p className="review-text">{review.review}</p>
                {review.purchase && (
                  <div className="purchase-info">
                    <p>✓ Purchased: {review.car_make} {review.car_model} ({review.car_year})</p>
                    <p>Date: {review.purchase_date}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealer;