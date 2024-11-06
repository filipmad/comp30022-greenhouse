import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal12 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/economical" className="nav-button back-button">← Back to Economical Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/economical/goal11" className="nav-button previous-button">← Previous Economical Goal</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 12: Responsible Consumption and Production</h1>
          <p>
            Ensuring sustainable consumption and production patterns is critical for reducing environmental impact, preserving natural resources, and fostering economic growth. Goal 12 focuses on promoting efficiency, reducing waste, and supporting sustainable practices in production and consumption.
          </p>
          <p>
            Achieving this goal requires a systemic approach to sustainability, involving collaboration across industries, governments, and communities. Responsible consumption includes making informed choices that minimize waste and support sustainable products and services.
          </p>
          <p>
            Transforming consumption and production practices is essential for protecting the environment, conserving resources, and ensuring a healthier planet for future generations.
          </p>
        </div>

        <div className="goal-image">
          <img src="/factory.jpg" alt="Responsible Consumption and Production" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 12: Responsible Consumption and Production</h2>
        <ul>
          <li><strong>Target 12.1:</strong> Implement the 10-Year Framework of Programs on Sustainable Consumption and Production Patterns, with all countries taking action, and developed countries taking the lead, taking into account the development and capabilities of developing countries.</li>
          <li><strong>Target 12.2:</strong> By 2030, achieve the sustainable management and efficient use of natural resources.</li>
          <li><strong>Target 12.3:</strong> By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains, including post-harvest losses.</li>
          <li><strong>Target 12.4:</strong> By 2020, achieve the environmentally sound management of chemicals and all wastes throughout their life cycle, in accordance with agreed international frameworks, and significantly reduce their release to air, water, and soil to minimize their adverse impacts on human health and the environment.</li>
          <li><strong>Target 12.5:</strong> By 2030, substantially reduce waste generation through prevention, reduction, recycling, and reuse.</li>
          <li><strong>Target 12.6:</strong> Encourage companies, especially large and transnational companies, to adopt sustainable practices and to integrate sustainability information into their reporting cycle.</li>
          <li><strong>Target 12.7:</strong> Promote public procurement practices that are sustainable, in accordance with national policies and priorities.</li>
          <li><strong>Target 12.8:</strong> By 2030, ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature.</li>
          <li><strong>Target 12.a:</strong> Support developing countries to strengthen their scientific and technological capacity to move towards more sustainable patterns of consumption and production.</li>
          <li><strong>Target 12.b:</strong> Develop and implement tools to monitor sustainable development impacts for sustainable tourism that creates jobs and promotes local culture and products.</li>
          <li><strong>Target 12.c:</strong> Rationalize inefficient fossil-fuel subsidies that encourage wasteful consumption by removing market distortions, in accordance with national circumstances, including by restructuring taxation and phasing out those harmful subsidies.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Responsible Consumption and Production</h2>
        <ul>
          <li><strong>Sustainability Consultant:</strong> <a href="https://www.greenbiz.com/" target="_blank" rel="noopener noreferrer">GreenBiz</a></li>
          <li><strong>Environmental Scientist:</strong> <a href="https://www.epa.gov/" target="_blank" rel="noopener noreferrer">U.S. Environmental Protection Agency (EPA)</a></li>
          <li><strong>Supply Chain Manager:</strong> <a href="https://www.apics.org/" target="_blank" rel="noopener noreferrer">APICS - Association for Supply Chain Management</a></li>
          <li><strong>Waste Management Specialist:</strong> <a href="https://www.waste360.com/" target="_blank" rel="noopener noreferrer">Waste360</a></li>
          <li><strong>Product Lifecycle Analyst:</strong> <a href="https://www.ellenmacarthurfoundation.org/" target="_blank" rel="noopener noreferrer">Ellen MacArthur Foundation</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Goal12;
