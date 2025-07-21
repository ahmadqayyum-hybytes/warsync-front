import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function ProductCard({ product, onAdd }) {
  return (
    <Card className="m-3 shadow-sm" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="fw-bold text-primary">{product.name}</Card.Title>
        <Card.Text style={{ fontSize: '0.9rem', color: '#555' }}>
          {product.description}
        </Card.Text>
        <h5 className="text-success">PKR {product.price.toLocaleString()}</h5>
        <Button variant="outline-primary" onClick={() => onAdd(product)}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
