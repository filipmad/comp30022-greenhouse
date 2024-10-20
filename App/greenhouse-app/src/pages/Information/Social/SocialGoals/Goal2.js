import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css'; 

const Goal2 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/social/goal1" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal3" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
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

        <div className="goal-image">
          <img src="/hunger.jpg" alt="Zero Hunger" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 2: Zero Hunger</h2>
        <ul>
          <li><strong>Target 2.1:</strong> By 2030, end hunger and ensure access by all people, in particular the poor and people in vulnerable situations, including infants, to safe, nutritious, and sufficient food all year round.</li>
          <li><strong>Target 2.2:</strong> By 2030, end all forms of malnutrition, including achieving by 2025 the internationally agreed targets on stunting and wasting in children under 5 years of age, and address the nutritional needs of adolescent girls, pregnant and lactating women, and older persons.</li>
          <li><strong>Target 2.3:</strong> By 2030, double the agricultural productivity and incomes of small-scale food producers, in particular women, indigenous peoples, family farmers, pastoralists, and fishers, through secure and equal access to land, other productive resources and inputs, knowledge, financial services, markets, and opportunities for value addition and non-farm employment.</li>
          <li><strong>Target 2.4:</strong> By 2030, ensure sustainable food production systems and implement resilient agricultural practices that increase productivity and production, that help maintain ecosystems, that strengthen capacity for adaptation to climate change, extreme weather, drought, flooding, and other disasters, and that progressively improve land and soil quality.</li>
          <li><strong>Target 2.5:</strong> By 2020, maintain the genetic diversity of seeds, cultivated plants, farmed and domesticated animals, and their related wild species, including through soundly managed and diversified seed and plant banks at the national, regional, and international levels, and promote access to and fair and equitable sharing of benefits arising from the utilization of genetic resources and associated traditional knowledge, as internationally agreed.</li>
          <li><strong>Target 2.a:</strong> Increase investment, including through enhanced international cooperation, in rural infrastructure, agricultural research and extension services, technology development, and plant and livestock gene banks to enhance agricultural productive capacity in developing countries, in particular least developed countries.</li>
          <li><strong>Target 2.b:</strong> Correct and prevent trade restrictions and distortions in world agricultural markets, including through the parallel elimination of all forms of agricultural export subsidies and all export measures with equivalent effect, in accordance with the mandate of the Doha Development Round.</li>
          <li><strong>Target 2.c:</strong> Adopt measures to ensure the proper functioning of food commodity markets and their derivatives and facilitate timely access to market information, including on food reserves, to help limit extreme food price volatility.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Zero Hunger</h2>
        <ul>
          <li>
            <strong>Agricultural Scientist:</strong> <a href="https://www.fao.org/" target="_blank" rel="noopener noreferrer">Food and Agriculture Organization (FAO)</a>
          </li>
          <li>
            <strong>Nutrition Specialist:</strong> <a href="https://www.wfp.org/" target="_blank" rel="noopener noreferrer">World Food Programme (WFP)</a>
          </li>
          <li>
            <strong>Food Security Analyst:</strong> <a href="https://www.ifpri.org/" target="_blank" rel="noopener noreferrer">International Food Policy Research Institute (IFPRI)</a>
          </li>
          <li>
            <strong>Sustainable Agriculture Expert:</strong> <a href="https://www.cgiar.org/" target="_blank" rel="noopener noreferrer">CGIAR Research Centers</a>
          </li>
          <li>
            <strong>Community Development Worker:</strong> <a href="https://www.oxfam.org/" target="_blank" rel="noopener noreferrer">Oxfam International</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal2;
