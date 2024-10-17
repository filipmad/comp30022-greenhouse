import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal6 = () => {
    return (
        <div className="goal-container">
            <div className="goal-nav-buttons">
                <Link to="/discover/environmental" className="nav-button back-button">← Back to Environmental Goals</Link>
                <div className="goal-nav-side-buttons">
                    <Link to="/discover/environmental/goal7" className="nav-button next-button">Next Environmental Goal →</Link>
                </div>
            </div>

            <div className="goal-content">
                <div className="goal-text">
                    <h1>Goal 6: Clean Water and Sanitation</h1>
                    <p>
                        Access to clean water and sanitation is a fundamental human right and a critical component of sustainable development.
                        Reliable access to safe drinking water and adequate sanitation facilities are essential for the health, well-being,
                        and economic productivity of communities worldwide.
                    </p>
                    <p>
                        Despite significant progress in recent decades, millions of people still lack access to these basic services,
                        particularly in rural and impoverished areas. Goal 6 aims to address these challenges by promoting sustainable
                        water management, improving water quality, and ensuring equitable sanitation services for all.
                    </p>
                    <p>
                        Achieving this goal requires global efforts to manage water resources more efficiently, reduce pollution, and
                        protect the ecosystems that support clean water supplies. Effective sanitation practices and innovative solutions
                        are needed to address the growing demands for water and mitigate the impacts of climate change on water availability.
                    </p>
                </div>

                <div className="goal-image">
                    <img src="/water.jpg" alt="Clean Water and Sanitation" />
                </div>
            </div>

            <div className="goal-targets">
                <h2>Targets for Goal 6: Clean Water and Sanitation</h2>
                <ul>
                    <li><strong>Target 6.1:</strong> By 2030, achieve universal and equitable access to safe and affordable drinking water for all.</li>
                    <li><strong>Target 6.2:</strong> By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations.</li>
                    <li><strong>Target 6.3:</strong> By 2030, improve water quality by reducing pollution, eliminating dumping, and minimizing the release of hazardous chemicals and materials.</li>
                    <li><strong>Target 6.4:</strong> By 2030, substantially increase water-use efficiency and ensure sustainable withdrawals to reduce water scarcity.</li>
                    <li><strong>Target 6.5:</strong> Implement integrated water resources management at all levels, including transboundary cooperation as appropriate.</li>
                    <li><strong>Target 6.6:</strong> By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers, and lakes.</li>
                    <li><strong>Target 6.a:</strong> Expand international cooperation to support water- and sanitation-related activities in developing countries.</li>
                    <li><strong>Target 6.b:</strong> Support the participation of local communities in improving water and sanitation management.</li>
                </ul>
            </div>

            <div className="goal-career">
                <h2>Career Opportunities Related to Clean Water and Sanitation</h2>
                <ul>
                    <li><strong>Water Resource Specialist:</strong> <a href="https://www.unwater.org/" target="_blank" rel="noopener noreferrer">UN-Water</a></li>
                    <li><strong>Sanitation Engineer:</strong> <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">World Health Organization (WHO)</a></li>
                    <li><strong>Environmental Scientist:</strong> <a href="https://www.epa.gov/" target="_blank" rel="noopener noreferrer">Environmental Protection Agency (EPA)</a></li>
                    <li><strong>Hydrologist:</strong> <a href="https://www.usgs.gov/" target="_blank" rel="noopener noreferrer">United States Geological Survey (USGS)</a></li>
                    <li><strong>Water Policy Analyst:</strong> <a href="https://www.worldbank.org/" target="_blank" rel="noopener noreferrer">The World Bank</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Goal6;
