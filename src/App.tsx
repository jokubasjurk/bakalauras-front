import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/login/Login";
import Registration from "./pages/registration/Registration";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </Router>
    );
};

export default App;