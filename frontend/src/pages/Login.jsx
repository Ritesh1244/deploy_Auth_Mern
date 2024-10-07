import React, { useState } from "react";

import { Icon } from "react-icons-kit";  
import { eyeOff } from "react-icons-kit/feather/eyeOff";  
import { eye } from "react-icons-kit/feather/eye"; 
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import '../StyleComponent/Signup.css';
import { handleError, handleSuccess } from "../utils";

function Login() {

    const [Logininfo, setLogininfo] = useState({
        email: '',
        password: '',
    });
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const navigate = useNavigate()

    const handleChange = async(e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...Logininfo };
        copyLoginInfo[name] = value;
        setLogininfo(copyLoginInfo);
    };

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        } else {
            setIcon(eyeOff);
            setType('password');
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = Logininfo;
        
        if (!email || !password) {
            return handleError('Email and password are required');
        }
    
        try {
            const response = await fetch('http://localhost:3000/auth/Login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Logininfo),
            });
            
            const result = await response.json();
            console.log(result);  // Log the API response to check jwt_token and name
    
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details?.[0]?.message || "An unexpected error occurred"; // Added a fallback message
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (error) {
            handleError(error.message || 'An error occurred during login');
        }
    };
    

    return (
        <div className="container">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
               
                {/* -------------------------------------email------------------------------------------- */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        id= "email"
                        placeholder="Enter Your email..."
                        value={Logininfo.email} // corrected value binding
                    />
                </div>

                {/* -------------------------------------password------------------------------------------- */}
                <div className="password-container">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-wrapper">
                        <input
                            onChange={handleChange}
                            type={type}
                            name="password"
                            id="password"
                            placeholder="Enter Your password..."
                            value={Logininfo.password}
                        />
                        <span className="icon-wrapper" onClick={handleToggle}>
                            <Icon icon={icon} size={25} />
                        </span>
                    </div>
                </div>


                {/* ------------------------------button------------------------------------------------ */}
                <button type="submit">Login</button>
                <span style={{ marginLeft: '5px' }}> Don't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
