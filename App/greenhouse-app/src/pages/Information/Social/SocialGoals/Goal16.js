import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';  

const Goal16 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/social/goal10" className="nav-button previous-button">← Previous Social Goal</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 16: Peace, Justice, and Strong Institutions</h1>
          <p>
            Promoting peaceful and inclusive societies, providing access to justice for all, and building effective, accountable institutions at all levels are essential for sustainable development. Goal 16 aims to reduce violence, end abuse, exploitation, and trafficking, and ensure that decision-making processes are responsive, inclusive, and representative.
          </p>
          <p>
            Peace, justice, and effective institutions are crucial for ensuring that individuals and communities can live in a safe and fair environment. It also involves addressing corruption, increasing transparency, and ensuring equal access to legal services.
          </p>
          <p>
            Building strong institutions and promoting the rule of law at national and international levels is fundamental to creating sustainable societies where everyone can thrive without fear of injustice or inequality.
          </p>
        </div>

        <div className="goal-image">
          <img src="/justice.jpg" alt="Peace, Justice, and Strong Institutions" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 16: Peace, Justice, and Strong Institutions</h2>
        <ul>
          <li><strong>Target 16.1:</strong> Significantly reduce all forms of violence and related death rates everywhere.</li>
          <li><strong>Target 16.2:</strong> End abuse, exploitation, trafficking, and all forms of violence against and torture of children.</li>
          <li><strong>Target 16.3:</strong> Promote the rule of law at the national and international levels and ensure equal access to justice for all.</li>
          <li><strong>Target 16.4:</strong> By 2030, significantly reduce illicit financial and arms flows, strengthen the recovery and return of stolen assets, and combat all forms of organized crime.</li>
          <li><strong>Target 16.5:</strong> Substantially reduce corruption and bribery in all their forms.</li>
          <li><strong>Target 16.6:</strong> Develop effective, accountable, and transparent institutions at all levels.</li>
          <li><strong>Target 16.7:</strong> Ensure responsive, inclusive, participatory, and representative decision-making at all levels.</li>
          <li><strong>Target 16.8:</strong> Broaden and strengthen the participation of developing countries in the institutions of global governance.</li>
          <li><strong>Target 16.9:</strong> By 2030, provide legal identity for all, including birth registration.</li>
          <li><strong>Target 16.10:</strong> Ensure public access to information and protect fundamental freedoms, in accordance with national legislation and international agreements.</li>
          <li><strong>Target 16.a:</strong> Strengthen relevant national institutions, including through international cooperation, for building capacity at all levels to prevent violence and combat terrorism and crime.</li>
          <li><strong>Target 16.b:</strong> Promote and enforce non-discriminatory laws and policies for sustainable development.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Peace, Justice, and Strong Institutions</h2>
        <ul>
          <li>
            <strong>Human Rights Lawyer:</strong> <a href="https://www.amnesty.org/" target="_blank" rel="noopener noreferrer">Amnesty International</a>
          </li>
          <li>
            <strong>Peacekeeping Officer:</strong> <a href="https://peacekeeping.un.org/" target="_blank" rel="noopener noreferrer">United Nations Peacekeeping</a>
          </li>
          <li>
            <strong>Legal Aid Advocate:</strong> <a href="https://www.legalaid.org/" target="_blank" rel="noopener noreferrer">Legal Aid Foundation</a>
          </li>
          <li>
            <strong>Policy Advisor:</strong> <a href="https://www.transparency.org/" target="_blank" rel="noopener noreferrer">Transparency International</a>
          </li>
          <li>
            <strong>Criminal Justice Specialist:</strong> <a href="https://www.icrc.org/" target="_blank" rel="noopener noreferrer">International Committee of the Red Cross (ICRC)</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal16;
