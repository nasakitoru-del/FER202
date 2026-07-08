import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const NavigationBar = ({ isLoggedIn, setIsLoggedIn, userProfile, setUserProfile, darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  // Cấu hình Google Login
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      localStorage.setItem('googleToken', codeResponse.access_token);
      setIsLoggedIn(true);
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`,
            Accept: 'application/json'
          }
        });
        const profile = {
          ...res.data,
          isAdmin: res.data.email === import.meta.env.VITE_ADMIN_EMAIL
        };
        setUserProfile(profile);
        localStorage.setItem('userProfile', JSON.stringify(profile));
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      }
    },
    onError: () => console.log('Login Failed'),
  });

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('googleToken');
    localStorage.removeItem('userProfile');
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate('/');
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar-custom">
      <Container className="d-flex align-items-center">
        {/* Sleek brand logo + name */}
        <Navbar.Brand as={Link} to="/" className="gap-2">
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="brand-logo-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21V9.75M12 9.75a3 3 0 1 1 6 0M12 9.75a3 3 0 1 0-6 0M6 9.75a6 6 0 0 1 12 0" />
          </svg>
          <span>Orchid App</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center mt-2 mt-lg-0">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            {isLoggedIn && userProfile?.isAdmin && (
              <Nav.Link as={NavLink} to="/management">
                Management
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/natural">
              Natural
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
              Favorites
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-2 ms-lg-auto mt-3 mt-lg-0">
            {/* Elegant Theme Toggle Icon Button */}
            <button
              type="button"
              className="theme-toggle-btn d-flex align-items-center justify-content-center"
              onClick={toggleTheme}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Google Sign In / User Profile */}
            {isLoggedIn && userProfile ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-profile" className="d-flex align-items-center gap-2 rounded-pill px-2 py-1 shadow-sm border-0" style={{ background: darkMode ? '#374151' : '#ffffff' }}>
                  <img src={userProfile.picture || 'https://via.placeholder.com/150'} alt="avatar" className="rounded-circle" width="32" height="32" />
                  <div className="d-none d-sm-flex flex-column align-items-start" style={{ lineHeight: '1.2' }}>
                    <span className="fw-semibold text-truncate" style={{ maxWidth: '100px', color: darkMode ? '#f9fafb' : '#374151', fontSize: '0.9rem' }}>{userProfile.name}</span>
                    <span style={{ fontSize: '0.7rem', color: userProfile.isAdmin ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                      {userProfile.isAdmin ? 'ADMIN' : 'MEMBER'}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className={darkMode ? 'dropdown-menu-dark shadow border-0' : 'shadow border-0'}>
                  <Dropdown.Item as={Link} to="/profile" className="d-flex align-items-center gap-2">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="light" className="google-login-btn px-3 py-1.5 d-flex align-items-center gap-2" onClick={() => login()}>
                <svg width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.5 24c0-1.63-.15-3.2-.43-4.75H24v9h12.75c-.55 2.94-2.21 5.44-4.71 7.12l7.31 5.67C43.6 36.6 46.5 30.82 46.5 24z" />
                  <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.3-5.68c-2.03 1.36-4.63 2.18-8.59 2.18-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>Sign in</span>
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;


