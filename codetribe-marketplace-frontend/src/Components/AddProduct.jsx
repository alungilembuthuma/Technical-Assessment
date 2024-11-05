import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Ensure this path is correct for your setup
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [firebaseError, setFirebaseError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFirebaseError('');
    setSuccessMessage('');

    if (!image) {
      setFirebaseError('Please upload an image.');
      return;
    }

    try {
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef); // Get the image URL after upload

      // Add product details to Firestore's "products" collection
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
      });

      // Clear form fields on successful submission
      setName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setSuccessMessage('Product added successfully!');
    } catch (error) {
      setFirebaseError('Error adding product: ' + error.message);
    }
  };

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

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={headingStyle}>Add Product</h1>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            style={inputStyle}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            style={inputStyle}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])} // Set image file
            accept="image/*"
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Add Product</button>
          {firebaseError && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {firebaseError}
            </p>
          )}
          {successMessage && (
            <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
