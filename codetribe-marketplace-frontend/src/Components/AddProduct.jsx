import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productsCollection = collection(db, 'products');
    await addDoc(productsCollection, { name, description, price: parseFloat(price) });
    alert('Product added successfully!');
  };

  return (
    <form onSubmit={handleAddProduct}>
      <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
