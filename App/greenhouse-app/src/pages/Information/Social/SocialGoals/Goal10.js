import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css'; 

const Goal10 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/social/goal5" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal16" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 10: Reduced Inequality</h1>
          <p>
            Reducing inequality within and among countries is essential for promoting sustainable development, ensuring that no one is left behind, and creating more inclusive societies. Despite progress in reducing income inequality in some areas, disparities in wealth and income persist worldwide.
          </p>
          <p>
            Inequality can manifest in many forms, including unequal access to resources, education, healthcare, and opportunities. Achieving greater equality requires targeted policies that promote inclusivity, support vulnerable communities, and empower marginalized groups.
          </p>
          <p>
            Addressing inequality is not only a matter of fairness but also a key driver of economic growth and social stability. Ensuring that everyone has equal opportunities to participate in society benefits communities and economies worldwide.
          </p>
        </div>

        <div className="goal-image">
          <img src="/equal.webp" alt="Reduced Inequality" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 10: Reduced Inequality</h2>
        <ul>
          <li><strong>Target 10.1:</strong> By 2030, progressively achieve and sustain income growth of the bottom 40% of the population at a rate higher than the national average.</li>
          <li><strong>Target 10.2:</strong> Empower and promote the social, economic, and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, religion, or economic or other status.</li>
          <li><strong>Target 10.3:</strong> Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies, and practices and promoting appropriate legislation, policies, and actions in this regard.</li>
          <li><strong>Target 10.4:</strong> Adopt policies, especially fiscal, wage, and social protection policies, and progressively achieve greater equality.</li>
          <li><strong>Target 10.5:</strong> Improve the regulation and monitoring of global financial markets and institutions and strengthen the implementation of such regulations.</li>
          <li><strong>Target 10.6:</strong> Ensure enhanced representation and voice for developing countries in decision-making in global international economic and financial institutions to deliver more effective, credible, accountable, and legitimate institutions.</li>
          <li><strong>Target 10.7:</strong> Facilitate orderly, safe, and responsible migration and mobility of people, including through the implementation of planned and well-managed migration policies.</li>
          <li><strong>Target 10.a:</strong> Implement the principle of special and differential treatment for developing countries, in particular least developed countries, in accordance with World Trade Organization agreements.</li>
          <li><strong>Target 10.b:</strong> Encourage official development assistance and financial flows, including foreign direct investment, to States where the need is greatest, in particular least developed countries, African countries, small island developing States, and landlocked developing countries, in accordance with their national plans and programs.</li>
          <li><strong>Target 10.c:</strong> By 2030, reduce to less than 3% the transaction costs of migrant remittances and eliminate remittance corridors with costs higher than 5%.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Reduced Inequality</h2>
        <ul>
          <li>
            <strong>Social Justice Advocate:</strong> <a href="https://www.aclu.org/" target="_blank" rel="noopener noreferrer">American Civil Liberties Union (ACLU)</a>
          </li>
          <li>
            <strong>Community Organizer:</strong> <a href="https://www.communitychange.org/" target="_blank" rel="noopener noreferrer">Community Change</a>
          </li>
          <li>
            <strong>Human Rights Lawyer:</strong> <a href="https://www.amnesty.org/" target="_blank" rel="noopener noreferrer">Amnesty International</a>
          </li>
          <li>
            <strong>Economic Policy Analyst:</strong> <a href="https://www.brookings.edu/" target="_blank" rel="noopener noreferrer">Brookings Institution</a>
          </li>
          <li>
            <strong>Public Policy Advisor:</strong> <a href="https://www.un.org/sustainabledevelopment/reduce-inequality/" target="_blank" rel="noopener noreferrer">United Nations Sustainable Development</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal10;
