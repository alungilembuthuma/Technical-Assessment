import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer'; // Adjust the import path as necessary

function LandingPage() {
  const navigate = useNavigate();

  // Inline styles as JavaScript objects
  const landingPageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    overflow: 'hidden',
    fontFamily: "'Arial', sans-serif",
    flexDirection: 'column', // Change to column to stack footer at bottom
  };

  const contentStyle = {
    marginTop: '15%',
    maxWidth: '600px',
    padding: '20px',
    animation: 'fadeIn 1.5s ease-in-out',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '10px',
    animation: 'slideIn 1s ease-out',
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    marginBottom: '20px',
    lineHeight: '1.6',
    animation: 'slideIn 1s ease-out',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#4facfe',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 1.0s ease',
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#e0f7fa';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#fff';
  };

  return (
    <div style={landingPageStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <div style={contentStyle}>
        <h1 style={headingStyle}>Welcome to CodeTribe Marketplace</h1>
        <p style={paragraphStyle}>Discover, buy, and sell amazing products with ease.</p>
        <button
          style={buttonStyle}
          onClick={() => navigate('/login')}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          Get Started
        </button>
      </div>

   <div style={{marginTop:"30%", width:"110%", }}>
   <Footer />
   </div>
     
    </div>
  );
}

export default LandingPage;
