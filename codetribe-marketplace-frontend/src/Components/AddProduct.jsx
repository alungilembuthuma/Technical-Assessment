import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebase'; // Ensure this path is correct based on your file structure
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // State for image
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    setSuccessMessage(''); // Clear any previous success messages

    if (!image) {
      setErrorMessage('Please upload an image.');
      return;
    }

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef); // Get the image URL

      // Create a reference to the products collection
      const productsCollection = collection(db, 'products');
      
      // Add a new document with the product details, including the image URL
      await addDoc(productsCollection, { 
        name, 
        description, 
        price: parseFloat(price), 
        imageUrl 
      });
      
      // Clear the form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setImage(null); // Clear image

      // Show success message
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      // Handle errors (e.g., network issues, Firestore errors)
      setErrorMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headingStyle}>Add Product</h2>
        <form onSubmit={handleAddProduct} style={styles.form}>
          <input 
            type="text" 
            placeholder="Product Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={inputStyle} 
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} // Update image state on file input change
            accept="image/*" 
            required 
            style={inputStyle} 
          />
          <button type="submit" style={buttonStyle}>Add Product</button>
        </form>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
      </div>
    </div>
  );
};

// Styling for the component
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

const styles = {
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
