import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const Profile = ({ userProfile, setUserProfile }) => {
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    bio: userProfile?.bio || '',
  });
  const [message, setMessage] = useState(null);

  if (!userProfile) {
    return (
      <Container className="mt-5 text-center py-5">
        <h3 className="text-muted">Please log in to view your profile.</h3>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = { ...userProfile, ...formData };
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <Container className="py-4 d-flex justify-content-center">
      <Card className="shadow-sm border-0 w-100" style={{ maxWidth: '600px', borderRadius: '1rem' }}>
        <Card.Body className="p-4 p-md-5">
          <div className="text-center mb-4">
            <img 
              src={userProfile.picture || 'https://via.placeholder.com/150'} 
              alt="Profile Avatar" 
              className="rounded-circle mb-3 shadow-sm"
              width="100" 
              height="100"
            />
            <h3 className="fw-bold mb-1" style={{ color: 'var(--text-h)' }}>{userProfile.name}</h3>
            <p className="text-muted mb-0">{userProfile.email}</p>
            {userProfile.isAdmin && (
              <span className="badge bg-premium-action mt-2">Admin</span>
            )}
          </div>

          <hr className="mb-4 opacity-25" />

          <h5 className="fw-semibold mb-3">Edit Information</h5>
          
          {message && (
            <Alert variant={message.type} className="py-2">
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Enter your phone number" 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Bio</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
                placeholder="Tell us a little about yourself" 
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="premium-action" type="submit" className="py-2 fw-semibold">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
