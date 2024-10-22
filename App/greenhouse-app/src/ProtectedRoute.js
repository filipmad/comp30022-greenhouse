import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make an API call to check if the user is authenticated
        const response = await axios.get('http://localhost:8000/check-auth', {
          withCredentials: true, 
        });

        if (response.data.success) {
          setIsAuthenticated(true); 
        } else {
          setIsAuthenticated(false); 
          // Navigate to /account if user is not authenticated
          if (window.location.pathname !== '/signup') {
            navigate('/account'); 
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false); 
        // Navigate to /account if there's an error
        if (window.location.pathname !== '/signup') {
          navigate('/account'); 
        }
      }
    };

    checkAuth();
  }, [navigate]);

  // While checking the authentication, you might want to show a loading state or nothing at all
  // if (isAuthenticated === null) {
  //   return <div>Loading...</div>;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
