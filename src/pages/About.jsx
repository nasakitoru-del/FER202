import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="mt-4 pb-5">
      {/* Hero Banner Section */}
      <div className="page-hero text-start">
        <div className="home-hero-glow"></div>
        <div className="position-relative z-1">
          <h1 className="page-hero-title">About Orchid Paradise</h1>
          <p className="page-hero-subtitle mb-0">
            A digital sanctuary designed to capture the beauty of orchids and share it with botanists, collectors, and flower enthusiasts worldwide.
          </p>
        </div>
      </div>

      <Row className="g-4">
        {/* Left Column: Story & Features */}
        <Col lg={7} className="text-start">
          {/* Story Card */}
          <div className="about-card-premium">
            <h3 className="fw-bold mb-3" style={{ color: 'var(--text-h)' }}>Our Sanctuary Story</h3>
            <p className="text-muted leading-relaxed">
              Founded in 2026, **Orchid Paradise** started with a simple passion: to build a beautiful, accessible library for one of nature's most diverse and elegant floral families. We believe that every orchid tells a unique story of adaptation, survival, and sheer elegance.
            </p>
            <p className="text-muted leading-relaxed mb-0">
              Through this application, we aim to bridge the gap between nature and software development, bringing a vivid, interactive botanical database right to your screen. Whether you are browsing rare natural wild species or award-winning cultivated hybrids, our platform is built to showcase their unique attributes.
            </p>
          </div>

          {/* Platform Features Grid */}
          <div className="about-card-premium">
            <h3 className="fw-bold mb-4" style={{ color: 'var(--text-h)' }}>Platform Highlights</h3>
            
            <Row className="g-3">
              <Col sm={6}>
                <div className="feature-pill-card h-100">
                  <div className="feature-icon-wrapper">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M12 3l4 4M12 3L8 7M12 21l4-4M12 21l-4-4"/>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1rem', color: 'var(--text-h)' }}>Diverse Database</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Explore a rich collection of 16+ unique orchid species with details.</p>
                </div>
              </Col>
              
              <Col sm={6}>
                <div className="feature-pill-card h-100">
                  <div className="feature-icon-wrapper">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1rem', color: 'var(--text-h)' }}>Multimedia Tours</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Access detailed botanical videos and high-quality zoomable images.</p>
                </div>
              </Col>

              <Col sm={6}>
                <div className="feature-pill-card h-100">
                  <div className="feature-icon-wrapper">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1rem', color: 'var(--text-h)' }}>Modern UX & Themes</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Switch between Dark and Light mode seamlessly with sticky navbars.</p>
                </div>
              </Col>

              <Col sm={6}>
                <div className="feature-pill-card h-100">
                  <div className="feature-icon-wrapper">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1rem', color: 'var(--text-h)' }}>Role Management</h5>
                  <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Secure administration panel via Google OAuth authentication.</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        {/* Right Column: Developer Profile */}
        <Col lg={5}>
          <div className="developer-card-premium h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="developer-avatar-wrapper">
              HD
            </div>
            
            <h3 className="fw-bold mb-1" style={{ color: 'var(--text-h)' }}>Nguyen Hoang Duc</h3>
            <p className="text-primary fw-semibold mb-4" style={{ fontSize: '0.95rem' }}>Software Engineer & Creator</p>
            
            <div className="w-100 text-start bg-light bg-opacity-25 rounded-3 p-3 mb-4 border border-light border-opacity-50">
              <div className="d-flex align-items-center gap-3 mb-3">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-muted">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${import.meta.env.VITE_ADMIN_EMAIL}`} className="text-decoration-none text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>
                  {import.meta.env.VITE_ADMIN_EMAIL}
                </a>
              </div>
              <div className="d-flex align-items-center gap-3">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-muted">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-muted fw-semibold" style={{ fontSize: '0.9rem' }}>
                  App Version: 1.0.0 (API Integrated)
                </span>
              </div>
            </div>

            <div className="w-100 text-start">
              <h5 className="fw-bold mb-3" style={{ fontSize: '0.95rem', color: 'var(--text-h)' }}>Core Tech Stack</h5>
              <div className="d-flex flex-wrap">
                <span className="tech-tag">React JS</span>
                <span className="tech-tag">Redux Toolkit</span>
                <span className="tech-tag">React Router</span>
                <span className="tech-tag">Bootstrap</span>
                <span className="tech-tag">Sass/SCSS</span>
                <span className="tech-tag">RESTful API</span>
                <span className="tech-tag">Google OAuth</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
