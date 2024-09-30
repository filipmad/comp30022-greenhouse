import React from 'react';
import { Link } from 'react-router-dom';
import './Social.css';

const Social = () => {
  return (
    <div className="pillar-container">
      <Link to="/goal1" className="pillar-item">
        <h2>Goal 1: No Poverty</h2>
        <p>End poverty in all its forms everywhere.</p>
      </Link>
      <Link to="/goal2" className="pillar-item">
        <h2>Goal 2: Zero Hunger</h2>
        <p>End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.</p>
      </Link>
      <Link to="/goal3" className="pillar-item">
        <h2>Goal 3: Good Health and Well-being</h2>
        <p>Ensure healthy lives and promote well-being for all at all ages.</p>
      </Link>
      <Link to="/goal4" className="pillar-item">
        <h2>Goal 4: Quality Education</h2>
        <p>Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.</p>
      </Link>
      <Link to="/goal5" className="pillar-item">
        <h2>Goal 5: Gender Equality</h2>
        <p>Achieve gender equality and empower all women and girls.</p>
      </Link>
      <Link to="/goal10" className="pillar-item">
        <h2>Goal 10: Reduced Inequality</h2>
        <p>Reduce inequality within and among countries.</p>
      </Link>
      <Link to="/goal16" className="pillar-item">
        <h2>Goal 16: Peace, Justice, and Strong Institutions</h2>
        <p>Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable institutions at all levels.</p>
      </Link>
    </div>
  );
};

export default Social;
