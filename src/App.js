// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { products } from './data/products';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import {
  Container,
  Navbar,
  Nav,
  Toast,
  ToastContainer
} from 'react-bootstrap';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <Router>
      {/* Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">WarSync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart ({cartItems.length})
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Content */}
      <Container className="mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="text-center mb-4">🛒 Explore Our Products</h2>
                <div className="d-flex flex-wrap justify-content-center">
                  {products.map(p => (
                    <ProductCard key={p.id} product={p} onAdd={addToCart} />
                  ))}
                </div>
              </>
            }
          />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        </Routes>
      </Container>

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
          bg="success"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Cart</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            ✔ Product added to cart!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Router>
  );
}

export default App;
