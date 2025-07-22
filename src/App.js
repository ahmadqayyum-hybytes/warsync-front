import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { products } from './data/products';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { Container, Navbar, Nav, Toast, ToastContainer } from 'react-bootstrap';
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500); // Hide toast after 2.5 sec
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
                <h2 className="text-center mb-4">:shopping_trolley: Explore Our Products</h2>
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
      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
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
          <Toast.Body className="text-white">:white_tick: Product added to cart!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Router>
  );
}
export default App;





