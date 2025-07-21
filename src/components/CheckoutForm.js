import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function CheckoutForm({ cartItems }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    city: '', zip: '', notes: '', payment: 'Cash on Delivery'
  });

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://<YOUR-BACKEND-PRIVATE-IP>:3000/place-order', {
        ...form, products: cartItems, total
      });
      alert("Order placed successfully!");
    } catch (err) {
      alert("Failed to place order");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
      <h3>Checkout</h3>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control name="phone" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control name="address" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control name="city" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>ZIP Code</Form.Label>
        <Form.Control name="zip" onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Order Notes</Form.Label>
        <Form.Control name="notes" as="textarea" rows={2} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Payment</Form.Label>
        <Form.Control as="select" name="payment" onChange={handleChange}>
          <option>Cash on Delivery</option>
        </Form.Control>
      </Form.Group>
      <h5 className="mt-3">Total: PKR {total}</h5>
      <Button type="submit" variant="success" className="mt-2">Place Order</Button>
    </Form>
  );
}
