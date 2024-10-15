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
        {location.pathname === '/discover/goal17' ? (
          <button className="social-nav-button">Environmental</button>
        ) : (
          <Link to="/discover/goal17" className="social-nav-button goal17">Goal 17</Link>
        )}
      </div>

      <div className="social-pillar-container">
        <Link to="/discover/social/goal1" className="social-pillar-item">
          <h2>Goal 1: No Poverty</h2>
          <p>End poverty in all its forms everywhere.</p>
        </Link>

        <Link to="/discover/social/goal2" className="social-pillar-item">
          <h2>Goal 2: Zero Hunger</h2>
          <p>End hunger, achieve food security, and improve nutrition, and promote sustainable agriculture.</p>
        </Link>

        <Link to="/discover/social/goal3" className="social-pillar-item">
          <h2>Goal 3: Good Health and Well-being</h2>
          <p>Ensure healthy lives and promote well-being for all at all ages.</p>
        </Link>

        <Link to="/discover/social/goal4" className="social-pillar-item">
          <h2>Goal 4: Quality Education</h2>
          <p>Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.</p>
        </Link>

        <Link to="/discover/social/goal5" className="social-pillar-item">
          <h2>Goal 5: Gender Equality</h2>
          <p>Achieve gender equality and empower all women and girls.</p>
        </Link>

        <Link to="/discover/social/goal10" className="social-pillar-item">
          <h2>Goal 10: Reduced Inequality</h2>
          <p>Reduce inequality within and among countries.</p>
        </Link>

        <Link to="/discover/social/goal16" className="social-pillar-item">
          <h2>Goal 16: Peace, Justice, and Strong Institutions</h2>
          <p>Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable institutions at all levels.</p>
        </Link>
      </div>
    </div>
  );
};

export default Social;
