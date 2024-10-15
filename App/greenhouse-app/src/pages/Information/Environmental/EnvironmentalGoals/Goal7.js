import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal7 = () => {
    return (
        <div className="goal-container">
            <div className="goal-nav-buttons">
                <Link to="/discover/environmental" className="nav-button back-button">← Back to Environmental Goals</Link>
                <div className="goal-nav-side-buttons">
                    <Link to="/discover/environmental/goal6" className="nav-button previous-button">← Previous Environmental Goal</Link>
                    <Link to="/discover/environmental/goal13" className="nav-button next-button">Next Environmental Goal →</Link>
                </div>
            </div>

            <div className="goal-content">
                <div className="goal-text">
                    <h1>Goal 7: Affordable and Clean Energy</h1>
                    <p>
                        Ensuring access to affordable, reliable, sustainable, and modern energy for all is crucial for sustainable development.
                        Clean energy plays a significant role in reducing poverty, improving health outcomes, and driving economic growth while addressing climate change.
                    </p>
                    <p>
                        Despite progress in renewable energy adoption, millions of people worldwide still lack access to basic energy services.
                        Transitioning to clean energy solutions is essential for achieving global energy security and mitigating the impacts of environmental degradation.
                    </p>
                    <p>
                        Goal 7 focuses on promoting renewable energy sources, improving energy efficiency, and expanding energy infrastructure to ensure that everyone
                        has access to sustainable energy options that can power their homes, businesses, and communities.
                    </p>
                </div>

                <div className="goal-image">
                    <img src="/solar.jpg" alt="Affordable and Clean Energy" />
                </div>
            </div>

            <div className="goal-targets">
                <h2>Targets for Goal 7: Affordable and Clean Energy</h2>
                <ul>
                    <li><strong>Target 7.1:</strong> By 2030, ensure universal access to affordable, reliable, and modern energy services.</li>
                    <li><strong>Target 7.2:</strong> By 2030, increase substantially the share of renewable energy in the global energy mix.</li>
                    <li><strong>Target 7.3:</strong> By 2030, double the global rate of improvement in energy efficiency.</li>
                    <li><strong>Target 7.a:</strong> Enhance international cooperation to facilitate access to clean energy research and technology, including renewable energy, energy efficiency, and advanced and cleaner fossil-fuel technology, and promote investment in energy infrastructure and clean energy technology.</li>
                    <li><strong>Target 7.b:</strong> Expand infrastructure and upgrade technology for supplying modern and sustainable energy services for all in developing countries, particularly in least developed countries, small island developing States, and landlocked developing countries, in accordance with their respective support programs.</li>
                </ul>
            </div>

            <div className="goal-career">
                <h2>Career Opportunities Related to Affordable and Clean Energy</h2>
                <ul>
                    <li><strong>Renewable Energy Engineer:</strong> <a href="https://www.iea.org/" target="_blank" rel="noopener noreferrer">International Energy Agency (IEA)</a></li>
                    <li><strong>Energy Policy Analyst:</strong> <a href="https://www.irena.org/" target="_blank" rel="noopener noreferrer">International Renewable Energy Agency (IRENA)</a></li>
                    <li><strong>Sustainable Energy Consultant:</strong> <a href="https://www.greenpeace.org/" target="_blank" rel="noopener noreferrer">Greenpeace</a></li>
                    <li><strong>Environmental Scientist:</strong> <a href="https://www.unep.org/" target="_blank" rel="noopener noreferrer">United Nations Environment Programme (UNEP)</a></li>
                    <li><strong>Solar Energy Specialist:</strong> <a href="https://www.solarenergy.org/" target="_blank" rel="noopener noreferrer">Solar Energy International</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Goal7;
