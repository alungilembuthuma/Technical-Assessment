const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, available } = req.body;
    const newProduct = { name, price, description, available };
    const productRef = await db.collection('products').add(newProduct);
    res.status(201).json({ id: productRef.id, ...newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
