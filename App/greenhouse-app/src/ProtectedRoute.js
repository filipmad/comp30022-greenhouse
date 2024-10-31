import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(0); 
  const [isAuthenticated, setIsAuthenticated] = useState(null); 


  const checkAdminPages = () => {
    return (window.location.pathname === '/news-admin' || window.location.pathname === '/community-admin' || window.location.pathname === '/admin-manager');
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make an API call to check if the user is authenticated
        const response = await axios.get('http://localhost:8000/check-auth', {
          withCredentials: true, 
        });

        if (response.data.success) {
          setIsAuthenticated(true); 
          setIsAdmin(response.data.isadmin);
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

  // If the user is authenticated but not an admin, restrict access to admin routes
  if (isAuthenticated && !isAdmin && checkAdminPages()) {
    return <div>Access Denied</div>; // Display a message or redirect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
