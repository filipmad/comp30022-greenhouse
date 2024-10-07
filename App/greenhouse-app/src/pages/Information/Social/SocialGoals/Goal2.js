import React from 'react';
import { Link } from 'react-router-dom';
import './Goal2.css';  

const Goal2 = () => {
  return (
    <div className="goal2-container">
      <div className="goal2-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal2-nav-side-buttons">
          <Link to="/discover/social/goal1" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal3" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal2-content">
        <div className="goal2-text">
          <h1>Goal 2: Zero Hunger</h1>
          <p>
            Ending hunger, achieving food security, and improving nutrition are essential to sustainable development.
            Although significant progress has been made in increasing agricultural productivity and reducing hunger,
            millions of people still suffer from undernourishment, and the world is not on track to reach Zero Hunger by 2030.
          </p>
          <p>
            Hunger and malnutrition continue to be barriers to sustainable development, affecting the lives of millions
            of people, especially in developing countries. Ensuring that all people have access to sufficient and nutritious
            food remains a top priority for achieving sustainable growth and human well-being.
          </p>
          <p>
            Investing in agriculture, supporting smallholder farmers, and improving food distribution systems are crucial steps
            to achieving food security for all and eliminating hunger in every part of the world.
          </p>
        </div>

        <div className="goal2-image">
          <img src="/hunger.jpg" alt="Zero Hunger" />
        </div>
      </div>

      <div className="goal2-targets">
        <h2>Targets for Goal 2: Zero Hunger</h2>
        <ul>
          <li><strong>Target 2.1:</strong> By 2030, end hunger and ensure access by all people, particularly the poor and people in vulnerable situations, to safe, nutritious, and sufficient food all year round.</li>
          <li><strong>Target 2.2:</strong> By 2030, end all forms of malnutrition, including achieving the internationally agreed targets on stunting and wasting in children under five years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women, and older persons.</li>
          <li><strong>Target 2.3:</strong> By 2030, double the agricultural productivity and incomes of small-scale food producers, particularly women, indigenous peoples, family farmers, and fishers, including through secure and equal access to land, resources, knowledge, and financial services.</li>
          <li><strong>Target 2.4:</strong> Ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, help maintain ecosystems, and strengthen the capacity for adaptation to climate change.</li>
        </ul>
      </div>

      <div className="goal2-career">
        <h2>Career Opportunities Related to Zero Hunger</h2>
        <ul>
          <li>
            <strong>Agricultural Scientist:</strong> <a href="https://www.fao.org/" target="_blank" rel="noopener noreferrer">Food and Agriculture Organization (FAO)</a>
          </li>
          <li>
            <strong>Nutritionist:</strong> <a href="https://www.nutrition.org/" target="_blank" rel="noopener noreferrer">American Society for Nutrition</a>
          </li>
          <li>
            <strong>Food Security Analyst:</strong> <a href="https://www.wfp.org/" target="_blank" rel="noopener noreferrer">World Food Programme (WFP)</a>
          </li>
          <li>
            <strong>Humanitarian Aid Worker:</strong> <a href="https://www.actionagainsthunger.org/" target="_blank" rel="noopener noreferrer">Action Against Hunger</a>
          </li>
          <li>
            <strong>Sustainable Agriculture Specialist:</strong> <a href="https://www.cgiar.org/" target="_blank" rel="noopener noreferrer">CGIAR Research Program</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal2;
