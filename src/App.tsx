import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import SuccessPage from "./component/SuccessPage";
import FailurePage from "./component/FailurePage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/failure" element={<FailurePage />} />
                <Route path="/*" element={<Registration />} />
            </Routes>
        </Router>
    );
};

export default App;