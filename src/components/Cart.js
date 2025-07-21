// src/components/Cart.js

import React from 'react';
import { Table } from 'react-bootstrap';

export default function Cart({ cartItems }) {
  // Group products by ID and count quantity
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = item.id;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const groupedArray = Object.values(groupedItems);
  const total = groupedArray.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <h3 className="mb-4">🛒 Your Cart</h3>
      {groupedArray.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {groupedArray.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>PKR {item.price.toLocaleString()}</td>
                <td>PKR {(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-end fw-bold">Total</td>
              <td className="fw-bold text-success">PKR {total.toLocaleString()}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
}
