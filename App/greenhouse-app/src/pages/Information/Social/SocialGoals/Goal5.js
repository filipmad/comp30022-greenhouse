import React from 'react';
import { Link } from 'react-router-dom';
import './Goal5.css';

const Goal5 = () => {
  return (
    <div className="goal5-container">
      <div className="goal5-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal5-nav-side-buttons">
          <Link to="/discover/social/goal4" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal10" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal5-content">
        <div className="goal5-text">
          <h1>Goal 5: Gender Equality</h1>
          <p>
            Achieving gender equality and empowering all women and girls is essential for ensuring sustainable development and creating a fair and just society. Gender equality is not only a fundamental human right but a necessary foundation for a peaceful, prosperous, and sustainable world.
          </p>
          <p>
            Despite progress in some areas, many challenges remain in providing equal opportunities for women in political, economic, and social spheres. Women continue to face discrimination and violence in many regions of the world.
          </p>
          <p>
            Ensuring gender equality requires addressing deep-rooted biases, supporting women's rights, increasing representation, and creating opportunities for all women and girls to realize their potential.
          </p>
        </div>

        <div className="goal5-image">
          <img src="/gender.jpg" alt="Gender Equality" />
        </div>
      </div>

      <div className="goal5-targets">
        <h2>Targets for Goal 5: Gender Equality</h2>
        <ul>
          <li><strong>Target 5.1:</strong> End all forms of discrimination against all women and girls everywhere.</li>
          <li><strong>Target 5.2:</strong> Eliminate all forms of violence against all women and girls in the public and private spheres, including trafficking and sexual and other types of exploitation.</li>
          <li><strong>Target 5.3:</strong> Eliminate all harmful practices, such as child, early, and forced marriage, and female genital mutilation.</li>
          <li><strong>Target 5.4:</strong> Recognize and value unpaid care and domestic work through the provision of public services, infrastructure, and social protection policies.</li>
        </ul>
      </div>

      <div className="goal5-career">
        <h2>Career Opportunities Related to Gender Equality</h2>
        <ul>
          <li>
            <strong>Gender Equality Specialist:</strong> <a href="https://www.unwomen.org/" target="_blank" rel="noopener noreferrer">UN Women</a>
          </li>
          <li>
            <strong>Social Worker:</strong> <a href="https://www.socialworkers.org/" target="_blank" rel="noopener noreferrer">National Association of Social Workers</a>
          </li>
          <li>
            <strong>Women's Rights Advocate:</strong> <a href="https://www.amnesty.org/en/what-we-do/discrimination/womens-rights/" target="_blank" rel="noopener noreferrer">Amnesty International - Women's Rights</a>
          </li>
          <li>
            <strong>Human Rights Lawyer:</strong> <a href="https://www.hrw.org/" target="_blank" rel="noopener noreferrer">Human Rights Watch</a>
          </li>
          <li>
            <strong>Community Outreach Coordinator:</strong> <a href="https://www.globalfundforwomen.org/" target="_blank" rel="noopener noreferrer">Global Fund for Women</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal5;
