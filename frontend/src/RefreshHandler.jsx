import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefreshHandler({ setAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuthenticated(true);
            // If the user is authenticated, navigate to the home page
            if (location.pathname === '/' || 
                location.pathname === '/login' || 
                location.pathname === '/signup') {
                navigate('/home', { replace: true });
            }
        }
    }, [location, navigate, setAuthenticated]);

    return null; // Return null as it doesn't render anything
}

export default RefreshHandler;
