// index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Place order endpoint
app.post('/place-order', async (req, res) => {
  const {
    firstName, lastName, email,
    phone, address, city, zip,
    notes = '', payment = 'Cash on Delivery',
    products = [], total = 0
  } = req.body;

  if (!firstName || !lastName || !phone || !address || products.length === 0) {
    return res.status(400).json({ error: 'Missing required fields or no products' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO orders
        (first_name, last_name, email, phone, address, city, zip_code, notes, payment_method, products, total_price)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        firstName, lastName, email || null, phone,
        address, city || null, zip || null,
        notes, payment,
        JSON.stringify(products),
        total
      ]
    );

    res.status(201).json({ message: 'Order placed', orderId: result.insertId });
  } catch (err) {
    console.error('❌ DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
