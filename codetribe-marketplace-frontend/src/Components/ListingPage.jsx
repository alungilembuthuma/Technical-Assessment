import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

  // Inline styling for simplicity
  const containerStyle = {
    padding: '20px',
    fontFamily: "'Arial', sans-serif",
    color: '#333',
  };

  const productItemStyle = {
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    position: 'fixed',
    top: '10px',
    right: '10px',
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

  return (
    <div style={containerStyle}>
      <h1>Product List</h1>
      <div style={cartIconStyle}>
        🛒
        <span style={cartCountStyle}>{cart.length}</span>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={productItemStyle}>
            <span>{product.name} - ${product.price}</span>
            <button style={buttonStyle} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
