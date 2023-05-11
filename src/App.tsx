import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import SuccessfulLogin from "./component/SuccessfulLogin";
import UnsuccessfulLogin from "./component/UnsuccessfulLogin";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Registration />} />
                <Route path="/successful-login" element={<SuccessfulLogin />} />
                <Route path="/unsuccessful-login" element={<UnsuccessfulLogin />} />
            </Routes>
        </Router>
    );
};

export default App;