import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './FailurePage.css';

const FailurePage = () => {
    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const location = useLocation();
    const { successType } = location.state || { type: null };
    let title;

    if (successType === 'login') {
        title = 'Unsuccessful Login';
    } else if (successType === 'registration') {
        title = 'Unsuccessful Registration';
    } else {
        title = 'Failure';
    }

    return (
        <div className="unsuccessful-login">
            <h1>{title}</h1>
            <button onClick={goToRegistration}>Go to Registration</button>
            <button onClick={goToLogin}>Go to Login</button>
        </div>
    );
};

export default FailurePage;
