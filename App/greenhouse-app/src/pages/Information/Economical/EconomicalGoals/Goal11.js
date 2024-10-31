import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal11 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/economical" className="nav-button back-button">← Back to Economical Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/economical/goal9" className="nav-button previous-button">← Previous Economical Goal</Link>
          <Link to="/discover/economical/goal12" className="nav-button next-button">Next Economical Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 11: Sustainable Cities and Communities</h1>
          <p>
            Making cities and human settlements inclusive, safe, resilient, and sustainable is essential for improving the quality of life for people everywhere. Goal 11 focuses on creating urban areas that support economic growth, social inclusion, and environmental sustainability.
          </p>
          <p>
            Sustainable cities provide affordable housing, accessible transportation, and green public spaces, fostering social and cultural interactions. Developing resilient infrastructure helps communities adapt to environmental challenges, like natural disasters and climate change.
          </p>
          <p>
            Achieving this goal requires investment in urban planning, community engagement, and policies that prioritize environmental protection and economic opportunities. Goal 11 aims to make cities more livable and adaptable to the needs of their residents.
          </p>
        </div>

        <div className="goal-image">
          <img src="/city.jpg" alt="Sustainable Cities and Communities" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 11: Sustainable Cities and Communities</h2>
        <ul>
          <li><strong>Target 11.1:</strong> By 2030, ensure access for all to adequate, safe, and affordable housing and basic services and upgrade slums.</li>
          <li><strong>Target 11.2:</strong> By 2030, provide access to safe, affordable, accessible, and sustainable transport systems for all, improving road safety, notably by expanding public transport, with special attention to the needs of those in vulnerable situations.</li>
          <li><strong>Target 11.3:</strong> By 2030, enhance inclusive and sustainable urbanization and capacity for participatory, integrated, and sustainable human settlement planning and management in all countries.</li>
          <li><strong>Target 11.4:</strong> Strengthen efforts to protect and safeguard the world's cultural and natural heritage.</li>
          <li><strong>Target 11.5:</strong> By 2030, significantly reduce the number of deaths and the number of people affected and substantially decrease the direct economic losses relative to global GDP caused by disasters, including water-related disasters, with a focus on protecting the poor and people in vulnerable situations.</li>
          <li><strong>Target 11.6:</strong> By 2030, reduce the adverse per capita environmental impact of cities, including by paying special attention to air quality and municipal and other waste management.</li>
          <li><strong>Target 11.7:</strong> By 2030, provide universal access to safe, inclusive, and accessible green and public spaces, in particular for women and children, older persons, and persons with disabilities.</li>
          <li><strong>Target 11.a:</strong> Support positive economic, social, and environmental links between urban, peri-urban, and rural areas by strengthening national and regional development planning.</li>
          <li><strong>Target 11.b:</strong> By 2020, substantially increase the number of cities and human settlements adopting and implementing integrated policies and plans towards inclusion, resource efficiency, mitigation, and adaptation to climate change, resilience to disasters, and develop holistic disaster risk management at all levels.</li>
          <li><strong>Target 11.c:</strong> Support least developed countries, including through financial and technical assistance, in building sustainable and resilient buildings utilizing local materials.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Sustainable Cities and Communities</h2>
        <ul>
          <li><strong>Urban Planner:</strong> <a href="https://www.planning.org/" target="_blank" rel="noopener noreferrer">American Planning Association</a></li>
          <li><strong>Environmental Engineer:</strong> <a href="https://www.wef.org/" target="_blank" rel="noopener noreferrer">Water Environment Federation (WEF)</a></li>
          <li><strong>Disaster Risk Reduction Specialist:</strong> <a href="https://www.undrr.org/" target="_blank" rel="noopener noreferrer">United Nations Office for Disaster Risk Reduction</a></li>
          <li><strong>Sustainable Transport Consultant:</strong> <a href="https://www.itdp.org/" target="_blank" rel="noopener noreferrer">Institute for Transportation and Development Policy (ITDP)</a></li>
          <li><strong>Community Development Manager:</strong> <a href="https://www.habitat.org/" target="_blank" rel="noopener noreferrer">Habitat for Humanity</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Goal11;
