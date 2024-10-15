import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css';

const Goal15 = () => {
    return (
        <div className="goal-container">
            <div className="goal-nav-buttons">
                <Link to="/discover/environmental" className="nav-button back-button">← Back to Environmental Goals</Link>
                <div className="goal-nav-side-buttons">
                    <Link to="/discover/environmental/goal14" className="nav-button previous-button">← Previous Environmental Goal</Link>
                </div>
            </div>

            <div className="goal-content">
                <div className="goal-text">
                    <h1>Goal 15: Life on Land</h1>
                    <p>
                        Protecting, restoring, and promoting the sustainable use of terrestrial ecosystems is crucial for combating desertification, halting biodiversity loss, and supporting life on Earth. Forests and natural landscapes are essential to human well-being, providing ecosystem services, food, water, and shelter.
                    </p>
                    <p>
                        Human activities, such as deforestation, land degradation, and pollution, threaten these vital resources. Preserving terrestrial ecosystems and ensuring sustainable management are key to protecting biodiversity and combating climate change.
                    </p>
                    <p>
                        Goal 15 emphasizes the need to promote conservation efforts, restore degraded land, and develop strategies to manage natural habitats sustainably to ensure a balanced ecosystem for future generations.
                    </p>
                </div>

                <div className="goal-image">
                    <img src="/forest.jpg" alt="Life on Land" />
                </div>
            </div>

            <div className="goal-targets">
                <h2>Targets for Goal 15: Life on Land</h2>
                <ul>
                    <li><strong>Target 15.1:</strong> By 2020, ensure the conservation, restoration, and sustainable use of terrestrial and inland freshwater ecosystems and their services, particularly forests, wetlands, mountains, and drylands.</li>
                    <li><strong>Target 15.2:</strong> By 2020, promote the implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests, and substantially increase afforestation and reforestation globally.</li>
                    <li><strong>Target 15.3:</strong> By 2030, combat desertification, restore degraded land and soil, including land affected by desertification, drought, and floods, and strive to achieve a land degradation-neutral world.</li>
                    <li><strong>Target 15.4:</strong> By 2030, ensure the conservation of mountain ecosystems, including their biodiversity, to enhance their capacity to provide benefits essential for sustainable development.</li>
                    <li><strong>Target 15.5:</strong> Take urgent and significant action to reduce the degradation of natural habitats, halt the loss of biodiversity, and, by 2020, protect and prevent the extinction of threatened species.</li>
                    <li><strong>Target 15.6:</strong> Promote fair and equitable sharing of the benefits arising from the utilization of genetic resources and promote appropriate access to such resources, as internationally agreed.</li>
                    <li><strong>Target 15.7:</strong> Take urgent action to end poaching and trafficking of protected species of flora and fauna and address both demand and supply of illegal wildlife products.</li>
                    <li><strong>Target 15.8:</strong> By 2020, introduce measures to prevent the introduction and significantly reduce the impact of invasive alien species on land and water ecosystems, and control or eradicate priority species.</li>
                    <li><strong>Target 15.9:</strong> By 2020, integrate ecosystem and biodiversity values into national and local planning, development processes, poverty reduction strategies, and accounts.</li>
                    <li><strong>Target 15.a:</strong> Mobilize and significantly increase financial resources from all sources to conserve and sustainably use biodiversity and ecosystems.</li>
                    <li><strong>Target 15.b:</strong> Mobilize significant resources from all sources and at all levels to finance sustainable forest management and provide adequate incentives to developing countries to advance sustainable forest management.</li>
                    <li><strong>Target 15.c:</strong> Enhance global support for efforts to combat poaching and trafficking of protected species, including by increasing the capacity of local communities to pursue sustainable livelihood opportunities.</li>
                </ul>
            </div>

            <div className="goal-career">
                <h2>Career Opportunities Related to Life on Land</h2>
                <ul>
                    <li><strong>Conservation Scientist:</strong> <a href="https://www.worldwildlife.org/" target="_blank" rel="noopener noreferrer">World Wildlife Fund (WWF)</a></li>
                    <li><strong>Forestry Manager:</strong> <a href="https://www.fao.org/forestry" target="_blank" rel="noopener noreferrer">Food and Agriculture Organization (FAO)</a></li>
                    <li><strong>Ecologist:</strong> <a href="https://www.iucn.org/" target="_blank" rel="noopener noreferrer">International Union for Conservation of Nature (IUCN)</a></li>
                    <li><strong>Wildlife Biologist:</strong> <a href="https://www.nationalgeographic.org/" target="_blank" rel="noopener noreferrer">National Geographic</a></li>
                    <li><strong>Sustainability Coordinator:</strong> <a href="https://www.unep.org/" target="_blank" rel="noopener noreferrer">United Nations Environment Programme (UNEP)</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Goal15;
