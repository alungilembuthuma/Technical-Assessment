import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/DashBoard';
import LoginRegister from './Components/LoginRegister';
import LandingPage from './Pages/LandingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = (credentials) => {
    const { username, password, isRegister } = credentials;
    if (isRegister) {
      if (username && password) {
        setIsLoggedIn(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Registration failed. Please fill all fields.');
      }
    } else {
      if (username === 'user' && password === 'password') {
        setIsLoggedIn(true);
        setErrorMessage('');
      } else {
        setErrorMessage('Login failed. Incorrect username or password.');
      }
    }
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginRegister onAuth={handleAuth} errorMessage={errorMessage} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
