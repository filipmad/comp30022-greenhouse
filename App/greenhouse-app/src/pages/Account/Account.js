import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

import './Components/GeneralAccount';

import AccountPage from './Components/GeneralAccount';
import Login from './Components/Login'

const UsernameCheck = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    var deployMent = "https://greenhouse-api-deployment-hyfmdxhse8c3gagh.australiasoutheast-01.azurewebsites.net"

    // Check authentication status on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(deployMent+'/check-auth', {
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
