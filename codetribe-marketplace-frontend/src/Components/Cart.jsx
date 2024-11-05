import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Redirect to checkout page or handle checkout logic
    navigate('/checkout');
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p style={emptyCartStyle}>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={cartListStyle}>
            {cartItems.map((item) => (
              <li key={item.id} style={cartItemStyle}>
                <img src={item.imageUrl} alt={item.name} style={imageStyle} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} style={buttonStyle}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} style={clearCartButtonStyle}>
            Clear Cart
          </button>
          <button onClick={handleCheckout} style={checkoutButtonStyle}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

// Sample styles
const containerStyle = {
  padding: '20px',
};

const headingStyle = {
  fontSize: '2rem',
};

const emptyCartStyle = {
  fontSize: '1.5rem',
  color: '#777',
};

const cartListStyle = {
  listStyleType: 'none',
  padding: 0,
};

const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  marginRight: '20px',
};

const buttonStyle = {
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
};

const clearCartButtonStyle = {
  marginTop: '20px',
  backgroundColor: '#f44336',
  color: 'white',
};

const checkoutButtonStyle = {
  marginLeft: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
};
