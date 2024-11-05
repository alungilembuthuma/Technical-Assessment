import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth functions
import Dashboard from './Components/DashBoard';
import LoginRegister from './Components/LoginRegister';
import LandingPage from './Pages/LandingPage';
import ListingPage from './Components/ListingPage';
import AddProduct from './Components/AddProduct';
import { auth } from "./firebase"; // Ensure your firebase is correctly imported

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async (credentials) => {
    const { email, password, isRegister } = credentials;

    try {
      if (isRegister) {
        // Register a new user with Firebase
        await createUserWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        setErrorMessage('');
      } else {
        // Sign in an existing user with Firebase
        await signInWithEmailAndPassword(auth, email, password);
        setIsLoggedIn(true);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage(error.message); // Display Firebase error message
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
            <Route path="/productlist" element={<ListingPage />} />
            <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
