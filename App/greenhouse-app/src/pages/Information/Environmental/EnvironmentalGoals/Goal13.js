import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal13 = () => {
    return (
        <div className="goal-container">
            <div className="goal-nav-buttons">
                <Link to="/discover/environmental" className="nav-button back-button">← Back to Environmental Goals</Link>
                <div className="goal-nav-side-buttons">
                    <Link to="/discover/environmental/goal7" className="nav-button previous-button">← Previous Environmental Goal</Link>
                    <Link to="/discover/environmental/goal14" className="nav-button next-button">Next Environmental Goal →</Link>
                </div>
            </div>

            <div className="goal-content">
                <div className="goal-text">
                    <h1>Goal 13: Climate Action</h1>
                    <p>
                        Taking urgent action to combat climate change and its impacts is crucial for the well-being of our planet and future generations.
                        Climate change is one of the most pressing challenges of our time, affecting every country on every continent.
                        It disrupts national economies and impacts lives, with people, communities, and countries feeling its effects most acutely.
                    </p>
                    <p>
                        Achieving Goal 13 requires a global effort to reduce greenhouse gas emissions, adopt sustainable practices, and develop climate-resilient strategies.
                        By taking immediate action, we can mitigate the effects of climate change, protect natural habitats, and promote a sustainable future.
                    </p>
                    <p>
                        This goal also focuses on increasing awareness, enhancing climate education, and improving institutional capacity to tackle climate-related issues effectively
                        on a local, national, and global scale.
                    </p>
                </div>

                <div className="goal-image">
                    <img src="/path.jpg" alt="Climate Action" />
                </div>
            </div>

            <div className="goal-targets">
                <h2>Targets for Goal 13: Climate Action</h2>
                <ul>
                    <li><strong>Target 13.1:</strong> Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries.</li>
                    <li><strong>Target 13.2:</strong> Integrate climate change measures into national policies, strategies, and planning.</li>
                    <li><strong>Target 13.3:</strong> Improve education, awareness-raising, and human and institutional capacity on climate change mitigation, adaptation, impact reduction, and early warning.</li>
                    <li><strong>Target 13.a:</strong> Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions.</li>
                    <li><strong>Target 13.b:</strong> Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth, and local and marginalized communities.</li>
                </ul>
            </div>

            <div className="goal-career">
                <h2>Career Opportunities Related to Climate Action</h2>
                <ul>
                    <li><strong>Climate Policy Analyst:</strong> <a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer">Intergovernmental Panel on Climate Change (IPCC)</a></li>
                    <li><strong>Environmental Scientist:</strong> <a href="https://www.unep.org/" target="_blank" rel="noopener noreferrer">United Nations Environment Programme (UNEP)</a></li>
                    <li><strong>Renewable Energy Specialist:</strong> <a href="https://www.irena.org/" target="_blank" rel="noopener noreferrer">International Renewable Energy Agency (IRENA)</a></li>
                    <li><strong>Conservation Scientist:</strong> <a href="https://www.worldwildlife.org/" target="_blank" rel="noopener noreferrer">World Wildlife Fund (WWF)</a></li>
                    <li><strong>Sustainability Consultant:</strong> <a href="https://www.greenpeace.org/" target="_blank" rel="noopener noreferrer">Greenpeace</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Goal13;
