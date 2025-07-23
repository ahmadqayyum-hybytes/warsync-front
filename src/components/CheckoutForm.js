// src/components/CheckoutForm.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function CheckoutForm({ cartItems }) {
  // Calculate total from cartItems
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  // DEBUG: confirm cartItems and total
  console.log('🏷️ cartItems:', cartItems, 'total:', total);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    notes: '',
    payment: 'Cash on Delivery',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quick client‐side guard
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      // ← Use a relative URL so Nginx proxies through the same origin
      const response = await axios.post('/place-order', {
        ...form,
        products: cartItems,
        total,
      });

      console.log('✅ Order response:', response.status, response.data);
      alert('Order placed successfully! ID: ' + response.data.orderId);
    } catch (err) {
      console.error('❌ Order submission error:', err.response?.data || err);
      alert(
        'Failed to place order: ' +
          (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="p-3 border rounded shadow-sm bg-light"
    >
      <h3>Checkout</h3>

      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          name="city"
          value={form.city}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>ZIP Code</Form.Label>
        <Form.Control
          name="zip"
          value={form.zip}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Order Notes</Form.Label>
        <Form.Control
          name="notes"
          as="textarea"
          rows={2}
          value={form.notes}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Payment</Form.Label>
        <Form.Control
          as="select"
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
        </Form.Control>
      </Form.Group>

      <h5 className="mt-3">Total: PKR {total}</h5>
      <Button type="submit" variant="success" className="mt-2">
        Place Order
      </Button>
    </Form>
  );
}
