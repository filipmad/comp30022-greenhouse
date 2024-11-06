import React, { useEffect, useState } from 'react';
import { Container, Card, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Newsletter = () => {
    const { id } = useParams(); // Get the newsletter ID from the URL
    const [newsletter, setNewsletter] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNewsletter = async (ID) => {
            try {
                const response = await axios.post(`http://localhost:8000/get-newsletter`, { id: parseInt(ID) }, { withCredentials: true });
                setNewsletter(response.data);
            } catch (error) {
                console.error('Error fetching newsletter:', error);
                setError('Failed to load newsletter');
            }
        };
        fetchNewsletter(id);
    }, [id]);
    
    const navigate = useNavigate();


    return (

        <Container className="mt-4">
            <Button onClick={() => {navigate('/news/newsletters')}}>Go Back</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            {newsletter ? (
                <Card>
                    <Card.Body>
                        <Card.Title>{newsletter.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Date: {new Date(newsletter.dateCreated).toLocaleDateString()}
                        </Card.Subtitle>
                        <Card.Text>{newsletter.text}</Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default Newsletter;
