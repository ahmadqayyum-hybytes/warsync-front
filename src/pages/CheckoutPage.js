import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

export default function CheckoutPage({ cartItems }) {
  return (
    <div className="p-4">
      <CheckoutForm cartItems={cartItems} />
    </div>
  );
}
