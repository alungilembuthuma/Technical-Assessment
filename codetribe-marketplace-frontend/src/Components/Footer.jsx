// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 0', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>About CodeTribe.com</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>About CodeTribe.com</a></li>
            <li><a href="#" style={linkStyle}>Newsroom</a></li>
            <li><a href="#" style={linkStyle}>Careers</a></li>
            <li><a href="#" style={linkStyle}>Supply Chain Transparency</a></li>
            <li><a href="#" style={linkStyle}>Affiliates</a></li>
            <li><a href="#" style={linkStyle}>CodeTribe Global Sites</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>CodeTribe.com</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>My Account</a></li>
            <li><a href="#" style={linkStyle}>Booking Status</a></li>
            <li><a href="#" style={linkStyle}>Beauty Insider</a></li>
            <li><a href="#" style={linkStyle}>Flash Subscription</a></li>
            <li><a href="#" style={linkStyle}>Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Help & FAQs</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>Online Booking</a></li>
            <li><a href="#" style={linkStyle}>Cancelation</a></li>
            <li><a href="#" style={linkStyle}>Refunds </a></li>
            <li><a href="#" style={linkStyle}>Contact Us</a></li>
            <li><a href="#" style={linkStyle}>Reservations</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Ways to Book</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><a href="#" style={linkStyle}>Just Booked</a></li>
            <li><a href="#" style={linkStyle}>Best Products</a></li>
            <li><a href="#" style={linkStyle}>Weekly Specials</a></li>
            <li><a href="#" style={linkStyle}>CodeTribe Vouchers</a></li>
            <li><a href="#" style={linkStyle}>Gift Cards</a></li>
          </ul>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderTop: '1px solid #333', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <form style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="email" style={{ fontSize: '14px', marginRight: '10px' }}>Subscribe for CodeTribe.com Emails</label>
            <input type="email" id="email" placeholder="Email address" style={inputStyle} />
            <button type="submit" style={buttonStyle}>Subscribe</button>
          </form>
        </div>

        <div>
          <select style={selectStyle}>
            <option value="US">South Africa</option>
            <option value="CA">Botswana </option>
            <option value="FR">France</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="#" style={iconStyle}><i className="fab fa-facebook-f"></i></a>
          <a href="#" style={iconStyle}><i className="fab fa-twitter"></i></a>
          <a href="#" style={iconStyle}><i className="fab fa-instagram"></i></a>
          <a href="#" style={iconStyle}><i className="fab fa-youtube"></i></a>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '10px 0', fontSize: '12px', color: '#aaa' }}>
        <p>© 2024 CodeTribe.com SA, Inc. All rights reserved. Terms of Use | Privacy Policy</p>
        <p>958 - 0860 Alungile SA  (0769580860)</p>
      </div>
    </footer>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '13px',
  lineHeight: '24px'
};

const inputStyle = {
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginRight: '10px'
};

const buttonStyle = {
  padding: '8px 12px',
  backgroundColor: '#333',
  color: '#fff',
  fontSize: '14px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const selectStyle = {
  padding: '8px',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const iconStyle = {
  color: '#fff',
  fontSize: '20px',
  textDecoration: 'none',
  cursor: 'pointer'
};

export default Footer;
