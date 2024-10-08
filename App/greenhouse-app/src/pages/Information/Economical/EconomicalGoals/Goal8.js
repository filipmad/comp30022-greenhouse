import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal8 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/economical" className="nav-button back-button">← Back to Economical Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/economical/goal7" className="nav-button previous-button">← Previous Economical Goal</Link>
          <Link to="/discover/economical/goal9" className="nav-button next-button">Next Economical Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 8: Decent Work and Economic Growth</h1>
          <p>
            Promoting sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all is essential to fostering prosperity and reducing inequalities. Goal 8 aims to ensure that economic progress creates opportunities for everyone, improves standards of living, and does not harm the environment.
          </p>
          <p>
            Achieving this goal requires creating jobs that provide fair wages, safe working conditions, and equal opportunities. It also involves supporting entrepreneurship, innovation, and the development of sustainable industries that drive economic growth.
          </p>
        </div>

        <div className="goal-image">
          <img src="path/to/economic-growth-image.jpg" alt="Decent Work and Economic Growth" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 8: Decent Work and Economic Growth</h2>
        <ul>
          <li><strong>Target 8.1:</strong> Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7% GDP growth per annum in the least developed countries.</li>
          <li><strong>Target 8.2:</strong> Achieve higher levels of economic productivity through diversification, technological upgrading, and innovation, including through a focus on high-value-added and labor-intensive sectors.</li>
          <li><strong>Target 8.3:</strong> Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity, and innovation, and encourage the formalization and growth of micro-, small-, and medium-sized enterprises, including through access to financial services.</li>
          <li><strong>Target 8.4:</strong> Improve progressively, through 2030, global resource efficiency in consumption and production and endeavor to decouple economic growth from environmental degradation, in accordance with the 10-Year Framework of Programs on Sustainable Consumption and Production, with developed countries taking the lead.</li>
          <li><strong>Target 8.5:</strong> By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value.</li>
          <li><strong>Target 8.6:</strong> By 2020, substantially reduce the proportion of youth not in employment, education, or training.</li>
          <li><strong>Target 8.7:</strong> Take immediate and effective measures to eradicate forced labor, end modern slavery and human trafficking, and secure the prohibition and elimination of the worst forms of child labor, including recruitment and use of child soldiers, and by 2025 end child labor in all its forms.</li>
          <li><strong>Target 8.8:</strong> Protect labor rights and promote safe and secure working environments for all workers, including migrant workers, in particular, women migrants and those in precarious employment.</li>
          <li><strong>Target 8.9:</strong> By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products.</li>
          <li><strong>Target 8.10:</strong> Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance, and financial services for all.</li>
          <li><strong>Target 8.a:</strong> Increase Aid for Trade support for developing countries, particularly least developed countries, including through the Enhanced Integrated Framework for Trade-Related Technical Assistance to Least Developed Countries.</li>
          <li><strong>Target 8.b:</strong> By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Decent Work and Economic Growth</h2>
        <ul>
          <li><strong>Economist:</strong> <a href="https://www.worldbank.org/" target="_blank" rel="noopener noreferrer">The World Bank</a></li>
          <li><strong>Labor Rights Advocate:</strong> <a href="https://www.ilo.org/" target="_blank" rel="noopener noreferrer">International Labour Organization (ILO)</a></li>
          <li><strong>Sustainable Business Consultant:</strong> <a href="https://www.sustainabilityprofessionals.org/" target="_blank" rel="noopener noreferrer">International Society of Sustainability Professionals (ISSP)</a></li>
          <li><strong>Entrepreneurship Coach:</strong> <a href="https://www.score.org/" target="_blank" rel="noopener noreferrer">SCORE Mentors</a></li>
          <li><strong>Microfinance Specialist:</strong> <a href="https://www.grameenfoundation.org/" target="_blank" rel="noopener noreferrer">Grameen Foundation</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Goal8;
