import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal14 = () => {
    return (
        <div className="goal-container">
            <div className="goal-nav-buttons">
                <Link to="/discover/environmental" className="nav-button back-button">← Back to Environmental Goals</Link>
                <div className="goal-nav-side-buttons">
                    <Link to="/discover/environmental/goal13" className="nav-button previous-button">← Previous Environmental Goal</Link>
                    <Link to="/discover/environmental/goal15" className="nav-button next-button">Next Environmental Goal →</Link>
                </div>
            </div>

            <div className="goal-content">
                <div className="goal-text">
                    <h1>Goal 14: Life Below Water</h1>
                    <p>
                        Conserving and sustainably using the oceans, seas, and marine resources is critical for the health of our planet. Oceans cover more than 70% of the Earth's surface and are vital to global ecosystems, providing food, regulating the climate, and supporting biodiversity.
                    </p>
                    <p>
                        Human activities such as overfishing, pollution, and habitat destruction have severely impacted marine life and ocean ecosystems. Protecting and restoring marine environments is essential to maintaining the balance of life on Earth and ensuring that oceans continue to provide their essential benefits.
                    </p>
                    <p>
                        Goal 14 emphasizes the need for international cooperation to reduce pollution, manage fish stocks sustainably, and preserve marine and coastal ecosystems for future generations.
                    </p>
                </div>

                <div className="goal-image">
                    <img src="/path.jpg" alt="Life Below Water" />
                </div>
            </div>

            <div className="goal-targets">
                <h2>Targets for Goal 14: Life Below Water</h2>
                <ul>
                    <li><strong>Target 14.1:</strong> By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution.</li>
                    <li><strong>Target 14.2:</strong> By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience and taking action for their restoration to achieve healthy and productive oceans.</li>
                    <li><strong>Target 14.3:</strong> Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels.</li>
                    <li><strong>Target 14.4:</strong> By 2020, effectively regulate harvesting and end overfishing, illegal, unreported, and unregulated fishing, and destructive fishing practices and implement science-based management plans to restore fish stocks in the shortest time feasible.</li>
                    <li><strong>Target 14.5:</strong> By 2025, conserve at least 10% of coastal and marine areas, consistent with national and international law and based on the best available scientific information.</li>
                    <li><strong>Target 14.6:</strong> By 2020, prohibit certain forms of fisheries subsidies that contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported, and unregulated fishing, and refrain from introducing new such subsidies.</li>
                    <li><strong>Target 14.7:</strong> By 2030, increase the economic benefits to small island developing states and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture, and tourism.</li>
                    <li><strong>Target 14.a:</strong> Increase scientific knowledge, develop research capacity, and transfer marine technology to improve ocean health and enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries.</li>
                    <li><strong>Target 14.b:</strong> Provide access for small-scale artisanal fishers to marine resources and markets.</li>
                    <li><strong>Target 14.c:</strong> Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in the United Nations Convention on the Law of the Sea (UNCLOS), which provides the legal framework for the conservation and sustainable use of oceans and their resources.</li>
                </ul>
            </div>

            <div className="goal-career">
                <h2>Career Opportunities Related to Life Below Water</h2>
                <ul>
                    <li><strong>Marine Biologist:</strong> <a href="https://www.marine-conservation.org/" target="_blank" rel="noopener noreferrer">Marine Conservation Institute</a></li>
                    <li><strong>Oceanographer:</strong> <a href="https://oceanexplorer.noaa.gov/" target="_blank" rel="noopener noreferrer">NOAA Ocean Explorer</a></li>
                    <li><strong>Fisheries Manager:</strong> <a href="https://www.fisheries.noaa.gov/" target="_blank" rel="noopener noreferrer">NOAA Fisheries</a></li>
                    <li><strong>Environmental Consultant:</strong> <a href="https://www.greenpeace.org/" target="_blank" rel="noopener noreferrer">Greenpeace</a></li>
                    <li><strong>Marine Policy Analyst:</strong> <a href="https://www.unep.org/" target="_blank" rel="noopener noreferrer">United Nations Environment Programme (UNEP)</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Goal14;
