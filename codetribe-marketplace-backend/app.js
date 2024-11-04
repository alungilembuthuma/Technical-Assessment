const express = require('express');
const firebaseAdmin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require('./serviceAccountKey.json')),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));

module.exports = app;
