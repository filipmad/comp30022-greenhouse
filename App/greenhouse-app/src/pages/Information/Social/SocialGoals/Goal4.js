import React from 'react';
import { Link } from 'react-router-dom';
import './Goal4.css';

const Goal4 = () => {
  return (
    <div className="goal4-container">
      <div className="goal4-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal4-nav-side-buttons">
          <Link to="/discover/social/goal3" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal5" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal4-content">
        <div className="goal4-text">
          <h1>Goal 4: Quality Education</h1>
          <p>
            Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all is essential for achieving sustainable development. Education enables upward socioeconomic mobility and is key to escaping poverty.
          </p>
          <p>
            Significant progress has been made in increasing access to education at all levels and increasing enrollment rates in schools, particularly for girls. However, major challenges remain in achieving universal access to quality education and ensuring that all children can complete their education.
          </p>
          <p>
            A focus on inclusive education and improved learning outcomes is necessary to prepare individuals for a rapidly changing world and to equip them with the skills needed to thrive in a global economy.
          </p>
        </div>

        <div className="goal4-image">
          <img src="/education.jpg" alt="Quality Education" />
        </div>
      </div>

      <div className="goal4-targets">
        <h2>Targets for Goal 4: Quality Education</h2>
        <ul>
          <li><strong>Target 4.1:</strong> By 2030, ensure that all girls and boys complete free, equitable, and quality primary and secondary education leading to relevant and effective learning outcomes.</li>
          <li><strong>Target 4.2:</strong> Ensure that all girls and boys have access to quality early childhood development, care, and pre-primary education so that they are ready for primary education.</li>
          <li><strong>Target 4.3:</strong> Ensure equal access for all women and men to affordable and quality technical, vocational, and tertiary education, including university.</li>
          <li><strong>Target 4.4:</strong> Substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs, and entrepreneurship.</li>
        </ul>
      </div>

      <div className="goal4-career">
        <h2>Career Opportunities Related to Quality Education</h2>
        <ul>
          <li>
            <strong>Teacher:</strong> <a href="https://www.teachforamerica.org/" target="_blank" rel="noopener noreferrer">Teach For America</a>
          </li>
          <li>
            <strong>Education Policy Analyst:</strong> <a href="https://www.brookings.edu/topic/education/" target="_blank" rel="noopener noreferrer">Brookings Institution - Education</a>
          </li>
          <li>
            <strong>Curriculum Developer:</strong> <a href="https://www.edutopia.org/" target="_blank" rel="noopener noreferrer">Edutopia</a>
          </li>
          <li>
            <strong>Education Technology Specialist:</strong> <a href="https://www.edsurge.com/" target="_blank" rel="noopener noreferrer">EdSurge</a>
          </li>
          <li>
            <strong>School Administrator:</strong> <a href="https://www.nassp.org/" target="_blank" rel="noopener noreferrer">National Association of Secondary School Principals</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal4;
