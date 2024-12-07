import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Updated imports for PNG images
import OfferIcon from '../assets/offer.png'; // Correct relative path for PNG
import ExploreIcon from '../assets/explore.png'; // Correct relative path for PNG
import PersonOutlineIcon from '../assets/outline.png'; // Correct relative path for PNG

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    return route === location.pathname;
  };

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li
            className="navbarListItem"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }} // Add cursor style for clickability
          >
            {/* PNG Icon */}
            <img
              src={ExploreIcon}
              alt="Explore"
              style={{
                width: '36px',
                height: '36px',
                filter: pathMatchRoute('/') ? 'grayscale(0)' : 'grayscale(100%)',
              }}
            />
            <p
              className={
                pathMatchRoute('/')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Explore
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => navigate('/offers')}
            style={{ cursor: 'pointer' }}
          >
            {/* PNG Icon */}
            <img
              src={OfferIcon}
              alt="Offers"
              style={{
                width: '36px',
                height: '36px',
                filter: pathMatchRoute('/offers') ? 'grayscale(0)' : 'grayscale(100%)',
              }}
            />
            <p
              className={
                pathMatchRoute('/offers')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Offers
            </p>
          </li>
          <li
            className="navbarListItem"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            {/* PNG Icon */}
            <img
              src={PersonOutlineIcon}
              alt="Profile"
              style={{
                width: '36px',
                height: '36px',
                filter: pathMatchRoute('/profile') ? 'grayscale(0)' : 'grayscale(100%)',
              }}
            />
            <p
              className={
                pathMatchRoute('/profile')
                  ? 'navbarListItemNameActive'
                  : 'navbarListItemName'
              }
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
