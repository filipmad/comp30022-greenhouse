import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Newsletters.css'

const NewsletterList = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [error, setError] = useState('');

    // Fetch all newsletters on component mount
    useEffect(() => {
        const fetchNewsletters = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-all-newsletters', { withCredentials: true });
                if (Array.isArray(response.data)) {
                    setNewsletters(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    setError("Failed to load newsletters");
                }
            } catch (error) {
                console.error('Error fetching newsletters:', error);
                setError('Failed to load newsletters');
            }
        };
        fetchNewsletters();
    }, []);
    const navigate = useNavigate();
    // Function to navigate to individual newsletter page
    const handleNavigate = (newsletterId) => {
        
        //history.push(`/newsletter/${newsletterId}`); // Adjust this path as needed
        navigate(`/news/newsletters/${newsletterId}`)
    };

    return (
        <Container>
            <h2 className="text-center mt-4">Newsletters</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="mt-4">
                {newsletters.map((newsletter) => (
                    <Col md={4} key={newsletter.id} className="mb-4">
                        <Card 
                            onClick={() => handleNavigate(newsletter.id)} 
                            className="newsletter-card" // Add a custom class
                        >
                            <Card.Body>
                                <Card.Title>{newsletter.title}</Card.Title>
                                <Card.Text>
                                    Date: {new Date(newsletter.dateCreated).toLocaleDateString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewsletterList;
