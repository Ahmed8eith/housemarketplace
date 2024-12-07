import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '../assets/delete.png'; // Changed to PNG import
import bedIcon from '../assets/bed.png';
import bathTub from '../assets/bathtub.png';

function ListingItem({ listing, id, onDelete }) {
  return (
    <li className="categoryListing">
      <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
        <img
          src={listing.imgUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />

        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            ${listing.offer ? listing.discountedPrice : listing.regularPrice}
            {listing.type === 'rent' && '/Month'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="Bed" style={{ width: '24px', height: '24px' }} />
            <p className="categoryListingInfoText">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
            </p>
            <img src={bathTub} alt="Bath" style={{ width: '24px', height: '24px' }} />
            <p className="categoryListingInfoText">
              {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <img
          src={DeleteIcon}
          alt="Delete"
          className="removeIcon"
          style={{
            cursor: 'pointer',
            width: '24px',
            height: '24px',
            filter: 'invert(35%) sepia(59%) saturate(724%) hue-rotate(346deg) brightness(94%) contrast(90%)', // Red color
          }}
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </li>
  );
}

export default ListingItem;
