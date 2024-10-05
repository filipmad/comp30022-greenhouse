import React from 'react';
import { Link } from 'react-router-dom';
import './Goal1.css';  

const Goal1 = () => {
  return (
    <div className="goal1-container">
      <div className="goal1-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <Link to="/goal/2" className="nav-button next-button">Next Social Goal →</Link>
      </div>

      <div className="goal1-content">
        <div className="goal1-text">
          <h1>Goal 1: No Poverty</h1>
          <p>
            Ending poverty in all its forms remains one of the greatest challenges facing humanity.
            While the number of people living in extreme poverty has dropped by more than half – from 1.9 billion in 1990,
            to 836 million in 2015 – too many people are still struggling to meet the most basic human needs.
          </p>
          <p>
            Rapid economic growth in countries like China and India has lifted millions out of poverty, but progress has been uneven.
            Women are more likely to be poor, and they face more obstacles to accessing education, healthcare, and decent work.
          </p>
          <p>
            To end poverty by 2030, strategies need to promote inclusive economic growth and target the most vulnerable populations.
            Social protection systems, access to basic services, and employment opportunities must be improved, especially for the poorest.
          </p>
        </div>

        <div className="goal1-image">
          <img src="/poverty.jpg" alt="No Poverty" />
        </div>
      </div>

      <div className="goal1-targets">
        <h2>Targets for Goal 1: No Poverty</h2>
        <ul>
          <li><strong>Target 1.1:</strong> By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day.</li>
          <li><strong>Target 1.2:</strong> By 2030, reduce at least by half the proportion of men, women, and children of all ages living in poverty in all its dimensions according to national definitions.</li>
          <li><strong>Target 1.3:</strong> Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable.</li>
          <li><strong>Target 1.4:</strong> By 2030, ensure that all men and women, particularly the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership, and control over land and other forms of property, inheritance, natural resources, appropriate new technology, and financial services, including microfinance.</li>
          <li><strong>Target 1.5:</strong> By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social, and environmental shocks and disasters.</li>
        </ul>
      </div>

      <div className="goal1-career">
        <h2>Career Opportunities Related to No Poverty</h2>
        <ul>
          <li>
            <strong>Social Worker:</strong> <a href="https://www.socialworkers.org/" target="_blank" rel="noopener noreferrer">National Association of Social Workers</a>
          </li>
          <li>
            <strong>International Development Specialist:</strong> <a href="https://www.devex.com/jobs" target="_blank" rel="noopener noreferrer">Devex International Development Jobs</a>
          </li>
          <li>
            <strong>Nonprofit Program Manager:</strong> <a href="https://www.idealist.org/en/jobs" target="_blank" rel="noopener noreferrer">Idealist Nonprofit Jobs</a>
          </li>
          <li>
            <strong>Microfinance Specialist:</strong> <a href="https://careers.actionagainsthunger.org/" target="_blank" rel="noopener noreferrer">Action Against Hunger</a>
          </li>
          <li>
            <strong>Policy Analyst:</strong> <a href="https://www.brookings.edu/" target="_blank" rel="noopener noreferrer">Brookings Institution</a>
          </li>
          <li>
            <strong>Humanitarian Aid Worker:</strong> <a href="https://www.doctorswithoutborders.org/careers/work-field" target="_blank" rel="noopener noreferrer">Doctors Without Borders</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal1;
