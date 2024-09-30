import React from 'react';
import { Link } from 'react-router-dom';
import './Economical.css';

const Economical = () => {
  return (
    <div className="pillar-container">
      <Link to="/goal8" className="pillar-item">
        <h2>Goal 8: Decent Work and Economic Growth</h2>
        <p>Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.</p>
      </Link>
      <Link to="/goal9" className="pillar-item">
        <h2>Goal 9: Industry, Innovation, and Infrastructure</h2>
        <p>Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation.</p>
      </Link>
      <Link to="/goal11" className="pillar-item">
        <h2>Goal 11: Sustainable Cities and Communities</h2>
        <p>Make cities and human settlements inclusive, safe, resilient, and sustainable.</p>
      </Link>
      <Link to="/goal12" className="pillar-item">
        <h2>Goal 12: Responsible Consumption and Production</h2>
        <p>Ensure sustainable consumption and production patterns.</p>
      </Link>
    </div>
  );
};

export default Economical;
