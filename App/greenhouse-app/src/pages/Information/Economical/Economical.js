import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Economical.css';

const Economical = () => {
  const location = useLocation();

  return (
    <div className="economical-container">
      <div className="economical-nav-buttons">
        {location.pathname === '/discover/social' ? (
          <button className="economical-nav-button">Social</button>
        ) : (
          <Link to="/discover/social" className="economical-nav-button social">Social</Link>
        )}
        {location.pathname === '/discover/economical' ? (
          <button className="economical-nav-button active">Economical</button>
        ) : (
          <Link to="/discover/economical" className="economical-nav-button economical">Economical</Link>
        )}
        {location.pathname === '/discover/environmental' ? (
          <button className="economical-nav-button">Environmental</button>
        ) : (
          <Link to="/discover/environmental" className="economical-nav-button environmental">Environmental</Link>
        )}
        {location.pathname === '/discover/goal17' ? (
          <button className="social-nav-button">Environmental</button>
        ) : (
          <Link to="/discover/goal17" className="social-nav-button goal17">Goal 17</Link>
        )}
      </div>

      <div className="economical-pillar-container">
        <Link to="/discover/economical/goal8" className="economical-pillar-item">
          <h2>Goal 8: Decent Work and Economic Growth</h2>
          <p>Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.</p>
        </Link>

        <Link to="/discover/economical/goal9" className="economical-pillar-item">
          <h2>Goal 9: Industry, Innovation, and Infrastructure</h2>
          <p>Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation.</p>
        </Link>

        <Link to="/discover/economical/goal11" className="economical-pillar-item">
          <h2>Goal 11: Sustainable Cities and Communities</h2>
          <p>Make cities and human settlements inclusive, safe, resilient, and sustainable.</p>
        </Link>

        <Link to="/discover/economical/goal12" className="economical-pillar-item">
          <h2>Goal 12: Responsible Consumption and Production</h2>
          <p>Ensure sustainable consumption and production patterns.</p>
        </Link>
      </div>
    </div>
  );
};

export default Economical;
