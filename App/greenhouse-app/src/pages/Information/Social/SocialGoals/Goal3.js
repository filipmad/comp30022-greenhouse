import React from 'react';
import { Link } from 'react-router-dom';
import './Goal3.css'; 

const Goal3 = () => {
  return (
    <div className="goal3-container">
      <div className="goal3-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal3-nav-side-buttons">
          <Link to="/discover/social/goal2" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal4" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal3-content">
        <div className="goal3-text">
          <h1>Goal 3: Good Health and Well-being</h1>
          <p>
            Ensuring healthy lives and promoting well-being for all at all ages is essential to sustainable development.
            Significant strides have been made in increasing life expectancy, reducing child and maternal mortality, and combating diseases.
            However, there is still much work to be done to improve the well-being of millions of people around the globe.
          </p>
          <p>
            Health challenges such as non-communicable diseases, mental health issues, and global pandemics remain barriers to progress.
            Access to quality healthcare and health services must be improved to achieve the ambitious health targets set for 2030.
          </p>
          <p>
            Sustainable development requires a focus on preventive healthcare, universal access to medical services, and innovative solutions
            to address emerging health challenges.
          </p>
        </div>

        <div className="goal3-image">
          <img src="/health.jpg" alt="Good Health and Well-being" />
        </div>
      </div>

      <div className="goal3-targets">
        <h2>Targets for Goal 3: Good Health and Well-being</h2>
        <ul>
          <li><strong>Target 3.1:</strong> By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births.</li>
          <li><strong>Target 3.2:</strong> End preventable deaths of newborns and children under 5 years of age, aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births.</li>
          <li><strong>Target 3.3:</strong> By 2030, end the epidemics of AIDS, tuberculosis, malaria, and neglected tropical diseases and combat hepatitis, water-borne diseases, and other communicable diseases.</li>
          <li><strong>Target 3.4:</strong> Reduce premature mortality from non-communicable diseases through prevention and treatment and promote mental health and well-being.</li>
        </ul>
      </div>

      <div className="goal3-career">
        <h2>Career Opportunities Related to Good Health and Well-being</h2>
        <ul>
          <li>
            <strong>Healthcare Professional:</strong> <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">World Health Organization (WHO)</a>
          </li>
          <li>
            <strong>Mental Health Counselor:</strong> <a href="https://www.mentalhealth.org.uk/" target="_blank" rel="noopener noreferrer">Mental Health Foundation</a>
          </li>
          <li>
            <strong>Epidemiologist:</strong> <a href="https://www.cdc.gov/" target="_blank" rel="noopener noreferrer">Centers for Disease Control and Prevention (CDC)</a>
          </li>
          <li>
            <strong>Public Health Researcher:</strong> <a href="https://www.nih.gov/" target="_blank" rel="noopener noreferrer">National Institutes of Health (NIH)</a>
          </li>
          <li>
            <strong>Global Health Advocate:</strong> <a href="https://www.doctorswithoutborders.org/" target="_blank" rel="noopener noreferrer">Doctors Without Borders</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal3;
