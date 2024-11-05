import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct based on your file structure

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    setSuccessMessage(''); // Clear any previous success messages

    try {
      // Create a reference to the products collection
      const productsCollection = collection(db, 'products');
      
      // Add a new document with the product details
      await addDoc(productsCollection, { name, description, price: parseFloat(price) });
      
      // Clear the form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      
      // Show success message
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      // Handle errors (e.g., network issues, Firestore errors)
      setErrorMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct} style={styles.form}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={styles.input} 
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={styles.textarea} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          style={styles.input} 
        />
        <button type="submit" style={styles.button}>Add Product</button>
      </form>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}
    </div>
  );
};

// Basic styling for the component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '80px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4facfe',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  },
};

export default AddProduct;
