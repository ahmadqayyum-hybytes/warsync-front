import React from 'react';
import Cart from '../components/Cart';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function CartPage({ cartItems }) {
  return (
    <div className="p-4">
      <Cart cartItems={cartItems} />
      <Link to="/checkout">
        <Button variant="primary" className="mt-3">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}
