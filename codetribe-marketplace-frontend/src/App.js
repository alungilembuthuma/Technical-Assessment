import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Dashboard from './Components/DashBoard';
import LoginRegister from './Components/LoginRegister';
import LandingPage from './Pages/LandingPage';
import ListingPage from './Components/ListingPage';
import AddProduct from './Components/AddProduct';
import { auth } from "./firebase"; // Ensure your Firebase setup is correct
import Cart from './Components/Cart';
import { CartProvider } from './CartContext'; // Assuming you have a CartContext for managing the cart state

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async (credentials) => {
    const { email, password, isRegister } = credentials;

    try {
      if (isRegister) {
        // Register a new user with Firebase
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Sign in an existing user with Firebase
        await signInWithEmailAndPassword(auth, email, password);
      }
      setIsLoggedIn(true); // Set logged in status to true
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage(error.message); // Display Firebase error message
    }
  };

  return (
    <CartProvider>
      <Router>
        <div>
          {isLoggedIn ? (
            <Dashboard /> // Render Dashboard when logged in
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginRegister onAuth={handleAuth} errorMessage={errorMessage} />} />
              <Route path="/productlist" element={<ListingPage />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
