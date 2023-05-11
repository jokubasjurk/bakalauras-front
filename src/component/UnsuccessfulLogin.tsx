import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UnsuccessfulLogin.css';

const UnsuccessfulLogin = () => {
    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/registration');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>Unsuccessful Login</h1>
            <button onClick={goToRegistration}>Go to Registration</button>
            <button onClick={goToLogin}>Go to Login</button>
        </div>
    );
};

export default UnsuccessfulLogin;
