import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Social.css';

const Social = () => {
  const location = useLocation();

  return (
    <div className="social-container">
      <div className="social-nav-buttons">
        {location.pathname === '/discover/social' ? (
          <button className="social-nav-button active">Social</button>
        ) : (
          <Link to="/discover/social" className="social-nav-button social">Social</Link>
        )}
        {location.pathname === '/discover/economical' ? (
          <button className="social-nav-button">Economical</button>
        ) : (
          <Link to="/discover/economical" className="social-nav-button economical">Economical</Link>
        )}
        {location.pathname === '/discover/environmental' ? (
          <button className="social-nav-button">Environmental</button>
        ) : (
          <Link to="/discover/environmental" className="social-nav-button environmental">Environmental</Link>
        )}
      </div>

      <div className="social-pillar-container">
        <div className="social-pillar-item">
          <h2>Goal 1: No Poverty</h2>
          <p>End poverty in all its forms everywhere.</p>
        </div>
        <div className="social-pillar-item">
          <h2>Goal 2: Zero Hunger</h2>
          <p>End hunger, achieve food security, and improved nutrition, and promote sustainable agriculture.</p>
        </div>
        <div className="social-pillar-item">
          <h2>Goal 3: Good Health and Well-being</h2>
          <p>Ensure healthy lives and promote well-being for all at all ages.</p>
        </div>
        <div className="social-pillar-item">
          <h2>Goal 4: Quality Education</h2>
          <p>Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.</p>
        </div>
        <div className="social-pillar-item">
          <h2>Goal 5: Gender Equality</h2>
          <p>Achieve gender equality and empower all women and girls.</p>
        </div>
        <div className="social-pillar-item">
          <h2>Goal 10: Reduced Inequality</h2>
          <p>Reduce inequality within and among countries.</p>
        </div>
        <div className="social-pillar-item">
          <h2>Goal 16: Peace, Justice, and Strong Institutions</h2>
          <p>Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable institutions at all levels.</p>
        </div>
      </div>
    </div>
  );
};

export default Social;
