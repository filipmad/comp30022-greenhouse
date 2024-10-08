import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css'; 

const Goal3 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/social/goal2" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal4" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
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

        <div className="goal-image">
          <img src="/health.jpg" alt="Good Health and Well-being" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 3: Good Health and Well-being</h2>
        <ul>
          <li><strong>Target 3.1:</strong> By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births.</li>
          <li><strong>Target 3.2:</strong> By 2030, end preventable deaths of newborns and children under 5 years of age.</li>
          <li><strong>Target 3.3:</strong> By 2030, end the epidemics of AIDS, tuberculosis, malaria, and neglected tropical diseases, and combat hepatitis, water-borne diseases, and other communicable diseases.</li>
          <li><strong>Target 3.4:</strong> By 2030, reduce by one-third premature mortality from non-communicable diseases through prevention and treatment, and promote mental health and well-being.</li>
          <li><strong>Target 3.5:</strong> Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol.</li>
          <li><strong>Target 3.6:</strong> By 2020, halve the number of global deaths and injuries from road traffic accidents.</li>
          <li><strong>Target 3.7:</strong> By 2030, ensure universal access to sexual and reproductive healthcare services.</li>
          <li><strong>Target 3.8:</strong> Achieve universal health coverage, including access to quality essential healthcare services.</li>
          <li><strong>Target 3.9:</strong> By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and pollution.</li>
          <li><strong>Target 3.a:</strong> Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control.</li>
          <li><strong>Target 3.b:</strong> Support research, development, and access to vaccines and medicines for communicable and non-communicable diseases.</li>
          <li><strong>Target 3.c:</strong> Increase funding for healthcare services, especially in developing countries.</li>
          <li><strong>Target 3.d:</strong> Strengthen the capacity of all countries to manage national and global health risks.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Good Health and Well-being</h2>
        <ul>
          <li><strong>Public Health Specialist:</strong> <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">World Health Organization (WHO)</a></li>
          <li><strong>Healthcare Worker:</strong> <a href="https://www.msf.org/" target="_blank" rel="noopener noreferrer">Doctors Without Borders</a></li>
          <li><strong>Epidemiologist:</strong> <a href="https://www.cdc.gov/" target="_blank" rel="noopener noreferrer">Centers for Disease Control and Prevention (CDC)</a></li>
          <li><strong>Nutritionist:</strong> <a href="https://www.unicef.org/" target="_blank" rel="noopener noreferrer">UNICEF</a></li>
          <li><strong>Medical Researcher:</strong> <a href="https://www.nih.gov/" target="_blank" rel="noopener noreferrer">National Institutes of Health (NIH)</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Goal3;
