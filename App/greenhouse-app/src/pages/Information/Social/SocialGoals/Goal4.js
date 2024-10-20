import React from 'react';
import { Link } from 'react-router-dom';
import './../../Goal.css'; 

const Goal4 = () => {
  return (
    <div className="goal-container">
      <div className="goal-nav-buttons">
        <Link to="/discover/social" className="nav-button back-button">← Back to Social Goals</Link>
        <div className="goal-nav-side-buttons">
          <Link to="/discover/social/goal3" className="nav-button previous-button">← Previous Social Goal</Link>
          <Link to="/discover/social/goal5" className="nav-button next-button">Next Social Goal →</Link>
        </div>
      </div>

      <div className="goal-content">
        <div className="goal-text">
          <h1>Goal 4: Quality Education</h1>
          <p>
            Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all is essential for sustainable development. Education is a powerful driver of development and one of the strongest instruments for reducing poverty and improving health, gender equality, peace, and stability.
          </p>
          <p>
            Providing quality education helps to improve social and economic outcomes, empowers individuals, and fosters the skills needed to contribute to society. A focus on education ensures that everyone has the opportunity to reach their full potential.
          </p>
          <p>
            Achieving quality education for all requires efforts to eliminate gender disparities, improve access to education at all levels, and enhance learning environments for students worldwide.
          </p>
        </div>

        <div className="goal-image">
          <img src="/education.jpg" alt="Quality Education" />
        </div>
      </div>

      <div className="goal-targets">
        <h2>Targets for Goal 4: Quality Education</h2>
        <ul>
          <li><strong>Target 4.1:</strong> By 2030, ensure that all girls and boys complete free, equitable, and quality primary and secondary education leading to relevant and effective learning outcomes.</li>
          <li><strong>Target 4.2:</strong> By 2030, ensure that all girls and boys have access to quality early childhood development, care, and pre-primary education so that they are ready for primary education.</li>
          <li><strong>Target 4.3:</strong> By 2030, ensure equal access for all women and men to affordable and quality technical, vocational, and tertiary education, including university.</li>
          <li><strong>Target 4.4:</strong> By 2030, substantially increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment, decent jobs, and entrepreneurship.</li>
          <li><strong>Target 4.5:</strong> By 2030, eliminate gender disparities in education and ensure equal access to all levels of education and vocational training for the vulnerable, including persons with disabilities, indigenous peoples, and children in vulnerable situations.</li>
          <li><strong>Target 4.6:</strong> By 2030, ensure that all youth and a substantial proportion of adults, both men and women, achieve literacy and numeracy.</li>
          <li><strong>Target 4.7:</strong> By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development, including education for sustainable development and sustainable lifestyles, human rights, gender equality, promotion of a culture of peace and non-violence, global citizenship, and appreciation of cultural diversity.</li>
          <li><strong>Target 4.a:</strong> Build and upgrade education facilities that are child, disability, and gender-sensitive and provide safe, non-violent, inclusive, and effective learning environments for all.</li>
          <li><strong>Target 4.b:</strong> By 2020, substantially expand the number of scholarships available to developing countries, particularly least developed countries, small island developing States, and African countries, for enrolment in higher education, including vocational training and information and communications technology, technical, engineering, and scientific programs in developed countries and other developing countries.</li>
          <li><strong>Target 4.c:</strong> By 2030, substantially increase the supply of qualified teachers, including through international cooperation for teacher training in developing countries, especially least developed countries and small island developing States.</li>
        </ul>
      </div>

      <div className="goal-career">
        <h2>Career Opportunities Related to Quality Education</h2>
        <ul>
          <li>
            <strong>Education Specialist:</strong> <a href="https://www.unesco.org/en" target="_blank" rel="noopener noreferrer">UNESCO</a>
          </li>
          <li>
            <strong>Teacher Trainer:</strong> <a href="https://www.teachforall.org/" target="_blank" rel="noopener noreferrer">Teach For All</a>
          </li>
          <li>
            <strong>Curriculum Developer:</strong> <a href="https://www.educationdevelopmenttrust.com/" target="_blank" rel="noopener noreferrer">Education Development Trust</a>
          </li>
          <li>
            <strong>Education Policy Advisor:</strong> <a href="https://www.brookings.edu/topic/education/" target="_blank" rel="noopener noreferrer">Brookings Institution - Education</a>
          </li>
          <li>
            <strong>Early Childhood Educator:</strong> <a href="https://www.savethechildren.org/" target="_blank" rel="noopener noreferrer">Save the Children</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goal4;
