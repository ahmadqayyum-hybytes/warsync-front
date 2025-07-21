// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { products } from './data/products';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      {/* Top Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">WarSync</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart ({cartItems.length})</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Container */}
      <Container className="mt-4">
        <Routes>
          {/* Home / Products Page */}
          <Route
            path="/"
            element={
              <>
                <h2 className="text-center mb-4">🛒 Explore Our Products</h2>
                <div className="d-flex flex-wrap justify-content-center">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAdd={addToCart} />
                  ))}
                </div>
              </>
            }
          />

          {/* Cart Page */}
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />

          {/* Checkout Page */}
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
