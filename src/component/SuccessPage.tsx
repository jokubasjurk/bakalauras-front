import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
    const navigate = useNavigate();

    const goToRegistration = () => {
        navigate('/');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const location = useLocation();
    const { successType } = location.state || { successType: null };
    let title;

    if (successType === 'login') {
        title = 'Successful Login';
    } else if (successType === 'registration') {
        title = 'Successful Registration';
    } else {
        title = 'Success';
    }
    return (
        <div className="successful-login">
            <h1>{title}</h1>
            <button onClick={goToRegistration}>Go to Registration</button>
            <button onClick={goToLogin}>Go to Login</button>
        </div>
    );
};

export default SuccessPage;
