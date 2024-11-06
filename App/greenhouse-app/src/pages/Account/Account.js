import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './SignUp.css';
import './Components/GeneralAccount';

import AccountPage from './Components/GeneralAccount';
import Login from './Components/Login'

const UsernameCheck = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState('');
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
                setIsAdmin(response.data.isadmin)
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuth();
    }, [navigate]);




    if (isAuthenticated) {
        return (
            <AccountPage
            getAdmin={isAdmin}
            />
        );
    } else {
        return (
            <Login/>
        );
    }
};

export default UsernameCheck;
