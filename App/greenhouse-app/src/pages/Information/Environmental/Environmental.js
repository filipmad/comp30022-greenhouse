import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Environmental.css';

const Environmental = () => {
  const location = useLocation();

  return (
    <div className="environmental-container">
      <div className="environmental-nav-buttons">
        {location.pathname === '/discover/social' ? (
          <button className="environmental-nav-button">Social</button>
        ) : (
          <Link to="/discover/social" className="environmental-nav-button social">Social</Link>
        )}
        {location.pathname === '/discover/economical' ? (
          <button className="environmental-nav-button">Economical</button>
        ) : (
          <Link to="/discover/economical" className="environmental-nav-button economical">Economical</Link>
        )}
        {location.pathname === '/discover/environmental' ? (
          <button className="environmental-nav-button active">Environmental</button>
        ) : (
          <Link to="/discover/environmental" className="environmental-nav-button environmental">Environmental</Link>
        )}
        
        
      </div>

      <div className="environmental-pillar-container">
        <div className="environmental-pillar-item">
          <h2>Goal 6: Clean Water and Sanitation</h2>
          <p>Ensure availability and sustainable management of water and sanitation for all.</p>
        </div>
        <div className="environmental-pillar-item">
          <h2>Goal 7: Affordable and Clean Energy</h2>
          <p>Ensure access to affordable, reliable, sustainable, and modern energy for all.</p>
        </div>
        <div className="environmental-pillar-item">
          <h2>Goal 13: Climate Action</h2>
          <p>Take urgent action to combat climate change and its impacts.</p>
        </div>
        <div className="environmental-pillar-item">
          <h2>Goal 14: Life Below Water</h2>
          <p>Conserve and sustainably use the oceans, seas, and marine resources for sustainable development.</p>
        </div>
        <div className="environmental-pillar-item">
          <h2>Goal 15: Life on Land</h2>
          <p>Protect, restore, and promote sustainable use of terrestrial ecosystems.</p>
        </div>
      </div>
    </div>
  );
};

export default Environmental;
