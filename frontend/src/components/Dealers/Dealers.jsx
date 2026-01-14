import React, { useState, useEffect } from 'react';
import './Dealers.css';

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const username = sessionStorage.getItem('username');
    setIsLoggedIn(!!username);

    // Fetch dealers
    fetch('http://localhost:8000/djangoapp/get_dealerships/')
      .then(response => response.json())
      .then(data => {
        const dealers = data.dealerships || [];
        setDealersList(dealers);
        
        // Extract unique states
        const uniqueStates = [...new Set(dealers.map(d => d.state))];
        setStates(['All', ...uniqueStates]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dealers:', error);
        setLoading(false);
      });
  }, []);

  const filteredDealers = selectedState === 'All' 
    ? dealersList 
    : dealersList.filter(d => d.state === selectedState);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="dealers-container">
        <div className="loading">Loading dealerships...</div>
      </div>
    );
  }

  return (
    <div className="dealers-container">
      <div className="dealers-header">
        <h1>🚗 Best Cars Dealerships</h1>
        
        {isLoggedIn ? (
          <div className="user-info">
            <span>Welcome, {sessionStorage.getItem('username')}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <a href="/login" className="login-btn">Login</a>
            <a href="/register" className="register-btn">Register</a>
          </div>
        )}
      </div>

      <div className="filter-section">
        <label htmlFor="state-filter">Filter by State:</label>
        <select 
          id="state-filter"
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <div className="dealers-grid">
        {filteredDealers.length > 0 ? (
          filteredDealers.map(dealer => (
            <div key={dealer.id} className="dealer-card">
              <h3>{dealer.full_name}</h3>
              <p>📍 {dealer.city}, {dealer.state}</p>
              <p>📮 {dealer.address}</p>
              <p>🔢 ZIP: {dealer.zip}</p>
              <a href={`/dealer/${dealer.id}`} className="view-details">
                View Details →
              </a>
            </div>
          ))
        ) : (
          <div className="no-dealers">
            <p>No dealerships found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dealers;