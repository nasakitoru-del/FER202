import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrchids } from '../redux/orchidSlice';
import { Link } from 'react-router-dom';
import { resolveOrchidImage } from '../utils/imageHelper';
import StarRating from '../components/StarRating';

const Favorites = () => {
  const dispatch = useDispatch();
  const { data: orchids = [], status } = useSelector((state) => state.orchids);
  const orchidList = Array.isArray(orchids) ? orchids : [];

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrchids());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (orchidList.length > 0) {
      const favList = orchidList.filter(o => localStorage.getItem(`orchid_fav_${o.id}`) === 'true');
      setFavorites(favList);
    }
  }, [orchidList]);

  const handleRemoveFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem(`orchid_fav_${id}`, 'false');
    setFavorites(prev => prev.filter(o => o.id !== id));
  };

  return (
    <Container className="py-4 pb-5">
      {/* Hero Banner Section */}
      <div className="page-hero text-center">
        <div className="home-hero-glow"></div>
        <div className="position-relative z-1">
          <h1 className="page-hero-title">My Favorites</h1>
          <p className="page-hero-subtitle mb-0">Your personal collection of loved orchids.</p>
        </div>
      </div>
      
      {favorites.length === 0 ? (
        <Alert variant="info" className="text-center rounded-4 shadow-sm mx-auto border-0 py-5" style={{ maxWidth: '600px' }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 text-info"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
          <h4 className="fw-bold mb-3">No favorites yet</h4>
          <p className="mb-4 text-muted">You haven't added any orchids to your favorites list. Explore our collection and tap the heart icon to save the ones you love!</p>
          <Link to="/" className="btn btn-premium-action px-4 py-2 rounded-pill fw-semibold">Explore Orchids</Link>
        </Alert>
      ) : (
        <Row xs={1} sm={2} lg={4} className="g-4">
          {favorites.map((orchid) => (
            <Col key={orchid.id}>
              <Card className="orchid-card-premium border-0 h-100">
                <div className="card-img-container" style={{ height: '220px' }}>
                  <img src={resolveOrchidImage(orchid.img)} alt={orchid.name} />
                  
                  {/* Remove favorite button */}
                  <button
                    type="button"
                    className="favorite-btn-floating is-favorite"
                    onClick={(e) => handleRemoveFavorite(orchid.id, e)}
                    title="Remove from favorites"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                <div className="card-body-content text-start p-3 d-flex flex-column h-100">
                  <div className="mb-2">
                    <h5 className="card-title-text text-truncate fw-bold fs-5 mb-1">{orchid.name}</h5>
                    <div className="text-muted small">{orchid.category}</div>
                  </div>

                  <div className="mt-auto mb-3">
                    <StarRating rating={orchid.rating} size={14} />
                  </div>

                  <Link to={`/detail/${orchid.id}`} className="btn btn-outline-premium btn-sm w-100 py-2">
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

export default Favorites;
