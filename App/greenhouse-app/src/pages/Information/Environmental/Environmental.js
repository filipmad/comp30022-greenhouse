import React from 'react';
import { Link } from 'react-router-dom';
import './Environmental.css';

const Environmental = () => {
  return (
    <div className="pillar-container">
      <Link to="/goal6" className="pillar-item">
        <h2>Goal 6: Clean Water and Sanitation</h2>
        <p>Ensure availability and sustainable management of water and sanitation for all.</p>
      </Link>
      <Link to="/goal7" className="pillar-item">
        <h2>Goal 7: Affordable and Clean Energy</h2>
        <p>Ensure access to affordable, reliable, sustainable, and modern energy for all.</p>
      </Link>
      <Link to="/goal13" className="pillar-item">
        <h2>Goal 13: Climate Action</h2>
        <p>Take urgent action to combat climate change and its impacts.</p>
      </Link>
      <Link to="/goal14" className="pillar-item">
        <h2>Goal 14: Life Below Water</h2>
        <p>Conserve and sustainably use the oceans, seas, and marine resources for sustainable development.</p>
      </Link>
      <Link to="/goal15" className="pillar-item">
        <h2>Goal 15: Life on Land</h2>
        <p>Protect, restore, and promote sustainable use of terrestrial ecosystems.</p>
      </Link>
    </div>
  );
};

export default Environmental;
