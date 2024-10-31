import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';



const Login = () => {

    //const navigate = useNavigate();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/check-username', { email, password }, { withCredentials: true });
            const { success, message } = response.data;

            if (success) {
                navigate('/home'); // Navigate to home after successful login
            } else {
                setResult(message); // Display any error message returned by the server
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setResult('Incorrect Email or Password');
        }
    };

    return <Container>
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={6}>
                <h2 className="text-center mb-4">Login to Greenhouse</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="link" onClick={() => navigate('/signup')} className="login-link">
                        New to Greenhouse?
                    </Button>
                    <br />
                    <Button variant="link" onClick={() => null} className="login-link">
                        Forgot Password
                    </Button>

                    <Button variant="primary" type="submit" className="w-100">
                        Login
                    </Button>
                </Form>
                {result && <div>{result}</div>}
            </Col>
        </Row>
    </Container>
}

export default Login;