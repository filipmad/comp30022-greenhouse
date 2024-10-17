import React from 'react';
import { Link } from 'react-router-dom';
import './Goal.css';

const Goal17 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back</Link>
        <div className="goal-nav-side-buttons">
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 17: Partnerships for the Goals</h1>
          <p>
            Strengthening the means of implementation and revitalizing the global partnership for sustainable development is essential for achieving all of the Sustainable Development Goals (SDGs). Global partnerships bring together governments, the private sector, civil society, and individuals to share knowledge, expertise, and resources.
          </p>
          <p>
            Goal 17 focuses on enhancing cooperation at all levels – local, national, and international – to mobilize resources, improve capacity-building efforts, and promote policies that foster sustainable development. It aims to foster multi-stakeholder partnerships that provide support, increase access to technology, and build capacity in developing countries to accelerate progress on the SDGs.
          </p>
          <p>
            To achieve global sustainable development, it is necessary to strengthen global cooperation in areas such as finance, technology, and capacity building to support the most vulnerable and ensure inclusive growth for all.
          </p>
        </div>

        <div className="goal-image">
          <img src="/partnership.jpg" alt="Partnerships for the Goals" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 17: Partnerships for the Goals</h2>
        <ul>
          <li><strong>Target 17.1:</strong> Strengthen domestic resource mobilization, including through international support to developing countries, to improve domestic capacity for tax and other revenue collection.</li>
          <li><strong>Target 17.2:</strong> Developed countries to implement fully their official development assistance commitments, including to provide 0.7% of gross national income in official development assistance to developing countries.</li>
          <li><strong>Target 17.3:</strong> Mobilize additional financial resources for developing countries from multiple sources.</li>
          <li><strong>Target 17.4:</strong> Assist developing countries in attaining long-term debt sustainability through coordinated policies aimed at fostering debt financing, debt relief, and debt restructuring.</li>
          <li><strong>Target 17.5:</strong> Adopt and implement investment promotion regimes for least developed countries.</li>
          <li><strong>Target 17.6:</strong> Enhance North-South, South-South, and triangular regional and international cooperation on access to science, technology, and innovation, and enhance knowledge-sharing on mutually agreed terms.</li>
          <li><strong>Target 17.7:</strong> Promote the development, transfer, dissemination, and diffusion of environmentally sound technologies to developing countries on favorable terms.</li>
          <li><strong>Target 17.8:</strong> Fully operationalize the technology bank and science, technology, and innovation capacity-building mechanism for least developed countries by 2017 and enhance the use of enabling technology, in particular information and communications technology.</li>
          <li><strong>Target 17.9:</strong> Enhance international support for implementing effective and targeted capacity-building in developing countries to support national plans to implement all the SDGs.</li>
          <li><strong>Target 17.10:</strong> Promote a universal, rules-based, open, non-discriminatory, and equitable multilateral trading system under the World Trade Organization.</li>
          <li><strong>Target 17.11:</strong> Significantly increase the exports of developing countries, in particular with a view to doubling the least developed countries' share of global exports by 2020.</li>
          <li><strong>Target 17.12:</strong> Realize timely implementation of duty-free and quota-free market access for all least developed countries consistent with World Trade Organization decisions.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Partnerships for the Goals</h2>
        <ul>
          <li><strong>International Development Officer:</strong> <a href="https://www.un.org/sustainabledevelopment/globalpartnerships/" target="_blank" rel="noopener noreferrer">United Nations</a></li>
          <li><strong>Global Partnerships Coordinator:</strong> <a href="https://www.worldbank.org/" target="_blank" rel="noopener noreferrer">The World Bank</a></li>
          <li><strong>Policy Advisor:</strong> <a href="https://www.oecd.org/" target="_blank" rel="noopener noreferrer">Organisation for Economic Co-operation and Development (OECD)</a></li>
          <li><strong>Capacity-Building Specialist:</strong> <a href="https://www.undp.org/" target="_blank" rel="noopener noreferrer">United Nations Development Programme (UNDP)</a></li>
          <li><strong>Technology Transfer Expert:</strong> <a href="https://www.wipo.int/" target="_blank" rel="noopener noreferrer">World Intellectual Property Organization (WIPO)</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Goal17;
