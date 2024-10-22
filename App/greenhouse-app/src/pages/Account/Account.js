import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './SignUp.css';

const UsernameCheck = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8000/check-auth', {
                    withCredentials: true, 
                });

                if (response.data.success) {
                    setIsAuthenticated(true);
                    //navigate('/home'); // Redirect to home if already authenticated
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/check-username', { email, password }, { withCredentials: true });
            const { success, message } = response.data;

            if (success) {
                setIsAuthenticated(true);
                navigate('/home'); // Navigate to home after successful login
            } else {
                setResult(message); // Display any error message returned by the server
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setResult('Incorrect Email or Password');
        }
    };

    const signOut = async (e) => {
        e.preventDefault();
        try {
            // Optional: Call an API to handle logout on the server-side if needed
            await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            // Clear the cookies on the client-side and update the state
            document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "gardenid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsAuthenticated(false);
            navigate('/account'); // Redirect to the account page after signing out
        }
    };

    if (isAuthenticated) {
        return (
            <>
                <h1>My Account</h1>
                <div>
                    <form onSubmit={signOut}>
                        <button type="submit">Sign Out</button>
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <Container>
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
        );
    }
};

export default UsernameCheck;
