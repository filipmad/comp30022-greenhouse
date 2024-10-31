import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal9 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/economical" className="nav-button back-button">← Back to Economical Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/economical/goal8" className="nav-button previous-button">← Previous Economical Goal</Link>
          <Link to="/discover/economical/goal11" className="nav-button next-button">Next Economical Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 9: Industry, Innovation, and Infrastructure</h1>
          <p>
            Building resilient infrastructure, promoting sustainable industrialization, and fostering innovation are crucial for economic growth. Goal 9 highlights the need to develop robust economies that can adapt to evolving societal demands.
          </p>
          <p>
            Infrastructure provides essential services like transport, communication, and energy, connecting people and businesses. Investing in sustainable infrastructure reduces environmental impacts and supports economic stability, while innovation drives productivity and technological advancement.
          </p>
          <p>
            Sustainable industrialization involves creating opportunities, enhancing resource efficiency, and supporting green technologies. Goal 9 aims to bridge infrastructure gaps in developing regions, ensuring access to technology and fostering innovation for resilient and inclusive economies.
          </p>
        </div>

        <div className="goal-image">
          <img src="/infrastructure.jpg" alt="Industry, Innovation, and Infrastructure" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 9: Industry, Innovation, and Infrastructure</h2>
        <ul>
          <li><strong>Target 9.1:</strong> Develop quality, reliable, sustainable, and resilient infrastructure to support economic development and human well-being, with a focus on affordable and equitable access for all.</li>
          <li><strong>Target 9.2:</strong> Promote inclusive and sustainable industrialization and significantly raise industry’s share of employment and GDP, in line with national circumstances, and double its share in least developed countries.</li>
          <li><strong>Target 9.3:</strong> Increase the access of small-scale industrial and other enterprises, particularly in developing countries, to financial services, including affordable credit, and their integration into value chains and markets.</li>
          <li><strong>Target 9.4:</strong> By 2030, upgrade infrastructure and retrofit industries to make them sustainable, with increased resource-use efficiency and greater adoption of clean and environmentally sound technologies and industrial processes.</li>
          <li><strong>Target 9.5:</strong> Enhance scientific research, upgrade the technological capabilities of industrial sectors in all countries, particularly developing countries, encouraging innovation and substantially increasing the number of research and development workers per 1 million people.</li>
          <li><strong>Target 9.a:</strong> Facilitate sustainable and resilient infrastructure development in developing countries through enhanced financial, technological, and technical support to African countries, least developed countries, landlocked developing countries, and small island developing states.</li>
          <li><strong>Target 9.b:</strong> Support domestic technology development, research, and innovation in developing countries, including by ensuring a conducive policy environment for, inter alia, industrial diversification and value addition to commodities.</li>
          <li><strong>Target 9.c:</strong> Significantly increase access to information and communications technology and strive to provide universal and affordable access to the internet in least developed countries by 2020.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Industry, Innovation, and Infrastructure</h2>
        <ul>
          <li><strong>Infrastructure Engineer:</strong> <a href="https://www.wbif.eu/" target="_blank" rel="noopener noreferrer">Western Balkans Investment Framework (WBIF)</a></li>
          <li><strong>Industrial Designer:</strong> <a href="https://www.idsa.org/" target="_blank" rel="noopener noreferrer">Industrial Designers Society of America (IDSA)</a></li>
          <li><strong>Innovation Specialist:</strong> <a href="https://www.weforum.org/" target="_blank" rel="noopener noreferrer">World Economic Forum</a></li>
          <li><strong>Research Scientist:</strong> <a href="https://www.nsf.gov/" target="_blank" rel="noopener noreferrer">National Science Foundation (NSF)</a></li>
          <li><strong>Sustainable Development Expert:</strong> <a href="https://www.sdgfund.org/" target="_blank" rel="noopener noreferrer">SDG Fund</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Goal9;
