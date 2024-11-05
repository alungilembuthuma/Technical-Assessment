import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';  // Import auth and db from firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";  // Import Firestore functions

export default function LoginRegister({ onAuth, errorMessage }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const [existingUsers, setExistingUsers] = useState([]); // State to hold registered users

  // Fetch existing users from Firestore when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data().email); // Assuming you want to store emails in an array
        });
        setExistingUsers(users);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []); // Run once when component mounts

  // Inline styles matching the landing page
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
  };
  const formStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'left',
    color: '#333',
  };
  const headingStyle = {
    fontSize: '1.8rem',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#2575fc',
  };
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  };
  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4facfe',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };
  const toggleStyle = {
    textAlign: 'center',
    color: '#2575fc',
    marginTop: '15px',
    cursor: 'pointer',
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        // Check if the user already exists
        if (existingUsers.includes(email)) {
          setFirebaseError('Email is already registered. Please use another email.');
          return;
        }

        // Register a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user to Firestore "users" collection
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          email: user.email,
        });
        onAuth({ email, password, isRegister });
      } else {
        // Log in existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the user is in the existing users
        if (!existingUsers.includes(email)) {
          setFirebaseError('No account found with this email. Please register first.');
          return;
        }

        onAuth({ email, password, isRegister });
      }
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={headingStyle}>{isRegister ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleAuth}>
          <input
            type="email"  // Use type email for better validation
            placeholder="Email"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={buttonStyle}>
            {isRegister ? 'Register' : 'Login'}
          </button>
          {(firebaseError || errorMessage) && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {firebaseError || errorMessage}
            </p>
          )}
        </form>
        <p style={toggleStyle} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
}
