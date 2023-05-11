import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessfulLogin.css';

const SuccessfulLogin = () => {
    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="successful-login">
            <h1>Successful Login</h1>
            <button onClick={goToRegistration}>Go to Registration</button>
            <button onClick={goToLogin}>Go to Login</button>
        </div>
    );
};

export default SuccessfulLogin;
