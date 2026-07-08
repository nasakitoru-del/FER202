import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center mt-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Page not found.</p>
      <Button as={Link} to="/" variant="primary">
        Back to Home
      </Button>
    </Container>
  );
};

export default NotFound;
