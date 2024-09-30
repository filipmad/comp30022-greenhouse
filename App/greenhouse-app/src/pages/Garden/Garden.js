import React from 'react';
import { Link } from 'react-router-dom';  
import './Garden.css'; 

const Garden = () => {
  return (
    <div className="garden-container">

      <div className="main-content">
        
        <div className="plant-details">
          <div className="plant-image">
          </div>
          <div className="plant-info">
            <p>Plant Info and Details</p>
          </div>
          <div className="plant-actions">
            <button>Info</button>
            <button>Water</button>
          </div>
        </div>
        
        <div className="plant-shelf">
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
          <div className="plant-pot"></div>
		  <div className="plant-pot"></div>
		  <div className="plant-pot"></div>
		  <div className="plant-pot"></div>
		  <div className="plant-pot"></div>
		  <div className="plant-pot"></div>
		  <div className="plant-pot"></div>
        </div>
      </div>
      
      <div className="sidebar">
        <div className="info-box">
          <p>Current season:</p>
          <p>Temp (°C):</p>
        </div>
        <div className="nursery-section">
          <Link to="/nursery" className="nursery-button">New Plants</Link>
          <div className="nursery"> </div>
        </div>
      </div>
    </div>
  );
};

export default Garden;
