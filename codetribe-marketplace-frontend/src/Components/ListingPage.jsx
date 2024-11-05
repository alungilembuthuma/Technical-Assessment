import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'; 
import Footer from '../Components/Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Inline styling for the component
  const containerStyle = {
    fontFamily: "'Arial', sans-serif",
    color: '#333',

  };

  const productItemStyle = {
    marginBottom: '20px', // Increased spacing between products
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: '#4facfe',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const cartIconStyle = {
   marginTop: '-7%',
   marginLeft: '94%',
    fontSize: '24px',
    color: '#4facfe',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  };

  const cartCountStyle = {
    backgroundColor: '#ff5252',
    color: '#fff',
    borderRadius: '50%',
    padding: '5px 10px',
    marginLeft: '5px',
    fontSize: '0.9rem',
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    padding: '10px 20px',
    color: '#fff',
    borderRadius: '0px',
    marginBottom: '20px', 
    width: '100%',
    height: '30px', 
    marginLeft: '-2%'
  };

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
    cursor: 'pointer',
  };

  const basketIconStyle = {
    marginRight: '8px',
    width: '16px', // Width of the basket icon
    height: '16px', // Height of the basket icon
  };

  return (
    <div style={containerStyle}>
      <div style={navbarStyle}>
        <div>
          <a style={navLinkStyle} onClick={() => navigate('/cart')}>Cart</a>
          <a style={navLinkStyle} onClick={() => navigate('/userprofile')}>User Profile</a>
        </div>
        <div>
          <a style={navLinkStyle} onClick={() => console.log('Logout')}>Logout</a>
        </div>
      </div>

      <h1 style={{ marginLeft: "15%" }}>Product List</h1>
      <button style={{ marginLeft: "35%" }} onClick={() => navigate('/addproduct')}>Add Product</button>
      <div style={cartIconStyle}>
        🛒
        <span style={cartCountStyle}>{cart.length}</span>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={productItemStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg 
                style={basketIconStyle} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-3 9H6L3 3zm0 0l3 9h15m-3 0h-4m-4 0h-3m7 0a1 1 0 011 1v6a1 1 0 11-2 0v-6a1 1 0 011-1zM6 18h12v1H6v-1z" />
              </svg>
              <span>{product.name} - ${product.price}</span>
            </div>
            <button style={buttonStyle} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <div style={{width:"120%", marginLeft:"-5%", marginTop:"20%"}}>
        <Footer/>
      </div>
    </div>
  );
};

export default ProductList;
