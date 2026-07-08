import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Contact = ({ userProfile, isLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userProfile?.email) {
      setEmail(userProfile.email);
    }
  }, [isLoggedIn, userProfile]);

  useEffect(() => {
    let t;
    if (success) t = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(t);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: name,
          email: email,
          message: message,
          subject: 'New Contact Message from Orchid Database',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setName('');
        if (!isLoggedIn) setEmail('');
        setMessage('');
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="mt-4 pb-5">
      <Row className="justify-content-center">
        <Col lg={7} md={9}>
          {/* Hero Banner Section */}
          <div className="page-hero text-center mb-4">
            <div className="home-hero-glow"></div>
            <div className="position-relative z-1">
              <h1 className="page-hero-title">Get in Touch</h1>
              <p className="page-hero-subtitle mb-0">Have a question about the orchid dashboard? Send us a message and we'll get back to you shortly.</p>
            </div>
          </div>

          <Card className="detail-card-premium border-0 p-2 p-md-4">
            <Card.Body>
              {error && <Alert variant="danger" className="rounded-3 shadow-sm border-0">{error}</Alert>}
              {success && (
                <Alert variant="success" className="rounded-3 shadow-sm border-0 d-flex align-items-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Message sent successfully! We will get back to you soon.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label className="small fw-semibold text-muted">Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="John Doe" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border-0 shadow-sm px-3 py-2"
                        style={{ background: 'var(--bg)' }}
                        disabled={isSubmitting}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label className="small fw-semibold text-muted">Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className={`border-0 shadow-sm px-3 py-2 ${isLoggedIn ? 'text-muted' : ''}`}
                        style={{ background: isLoggedIn ? 'var(--social-bg)' : 'var(--bg)', cursor: isLoggedIn ? 'not-allowed' : 'text' }}
                        disabled={isSubmitting || isLoggedIn}
                        readOnly={isLoggedIn}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="contactMessage">
                  <Form.Label className="small fw-semibold text-muted">Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Write your message here..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="border-0 shadow-sm px-3 py-2"
                    style={{ background: 'var(--bg)' }}
                    disabled={isSubmitting}
                  />
                </Form.Group>

                <Button variant="premium-action" type="submit" className="w-100 py-3 rounded-pill fw-bold fs-6 d-flex justify-content-center align-items-center gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;

