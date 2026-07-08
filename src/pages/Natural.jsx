import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrchids } from '../redux/orchidSlice';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { resolveOrchidImage } from '../utils/imageHelper';
import StarRating from '../components/StarRating';

const Natural = () => {
  const dispatch = useDispatch();
  const { data: orchids = [], status } = useSelector((state) => state.orchids);
  const naturalOrchids = Array.isArray(orchids) ? orchids.filter((orchid) => orchid.isNatural) : [];

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrchids());
    }
  }, [status, dispatch]);

  // Load favorites from localStorage
  useEffect(() => {
    const favMap = {};
    naturalOrchids.forEach((o) => {
      favMap[o.id] = localStorage.getItem(`orchid_fav_${o.id}`) === 'true';
    });
    setFavorites(favMap);
  }, [orchids]);

  const handleToggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const current = !!favorites[id];
    const newVal = !current;
    localStorage.setItem(`orchid_fav_${id}`, String(newVal));
    setFavorites((prev) => ({ ...prev, [id]: newVal }));
  };

  if (status === 'loading') {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted mt-2">Loading Natural collection...</p>
      </div>
    );
  }

  return (
    <Container className="mt-4 pb-4">
      {/* Hero Banner Section */}
      <div className="page-hero text-start">
        <div className="home-hero-glow"></div>
        <div className="position-relative z-1 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div>
            <h1 className="page-hero-title">Original Orchid Collection</h1>
            <p className="page-hero-subtitle mb-0">Browse the preserved natural orchids from the original lab data.</p>
          </div>
          <Link to="/" className="btn btn-outline-light px-4 py-2 fw-semibold" style={{ borderRadius: '999px', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.1)' }}>Back to Home</Link>
        </div>
      </div>

      {!naturalOrchids.length ? (
        <Alert variant="info" className="rounded-3 shadow-sm">No natural orchids found yet.</Alert>
      ) : (
        <Row xs={1} sm={2} lg={4} className="g-4">
          {naturalOrchids.map((orchid) => (
            <Col key={orchid.id}>
              <Card className="orchid-card-premium border-0">
                {/* Image Container with floating buttons */}
                <div className="card-img-container">
                  <img src={resolveOrchidImage(orchid.img)} alt={orchid.name} />
                  
                  {/* Floating favorite button */}
                  <button
                    type="button"
                    className={`favorite-btn-floating ${favorites[orchid.id] ? 'is-favorite' : ''}`}
                    onClick={(e) => handleToggleFavorite(orchid.id, e)}
                    title={favorites[orchid.id] ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>

                  {/* Badge Overlays */}
                  <div className="position-absolute bottom-0 start-0 m-2 d-flex gap-1.5 flex-wrap">
                    {orchid.isSpecial && (
                      <Badge bg="warning" text="dark" className="px-2 py-1.5 fs-8 shadow-sm rounded-2">
                        Special
                      </Badge>
                    )}
                    {orchid.isNatural && (
                      <Badge bg="success" className="px-2 py-1.5 fs-8 shadow-sm rounded-2 text-white border-0" style={{ background: '#10b981' }}>
                        Natural
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Card Body content */}
                <div className="card-body-content text-start">
                  <div className="mb-2">
                    <h3 className="card-title-text text-truncate">{orchid.name}</h3>
                  </div>

                  <div className="card-meta-row mt-auto">
                    <StarRating rating={orchid.rating} size={14} />
                  </div>

                  <Link to={`/detail/${orchid.id}`} className="btn btn-premium-action btn-sm w-100 py-2">
                    View Details
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Natural;
