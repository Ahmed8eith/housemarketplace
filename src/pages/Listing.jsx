import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import Spinner from '../assets/Spinner.gif';
import shareIcon from '../assets/svg/._shareIcon.svg';
import Slider from 'react-slick'; // Import React-Slick
import 'slick-carousel/slick/slick.css'; // Slick styles
import 'slick-carousel/slick/slick-theme.css'; // Slick theme

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Fetched Listing Data:', docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <img src={Spinner} alt="Loading..." />;
  }

  // Remove duplicate images if necessary
  const uniqueImages = listing.imgUrls.filter(
    (url, index, self) => self.indexOf(url) === index
  );
  console.log('Unique Images:', uniqueImages);

  const sliderSettings = {
    dots: true, // Enable pagination
    infinite: false, // Prevent React-Slick from duplicating slides
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    arrows: true, // Enable navigation arrows
  };

  return (
    <main>
      {/* React-Slick Carousel */}
      <div style={{ width: '80%', margin: 'auto',marginTop:'50px' }}>
      <div
  style={{
    overflow: 'hidden',
    borderRadius: '8px',
  }}
>
  <Slider {...sliderSettings}>
    {uniqueImages.map((url, index) => (
      <div key={`${url}-${index}`}>
        <img
          src={url}
          alt={`Slide ${index + 1}`}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'contain',
          }}
        />
      </div>
    ))}
  </Slider>
</div>


      </div>

      {/* Share Button */}
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="Share Icon" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      {/* Listing Details */}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className="listingLocationTitle" style={{ margin: 0, lineHeight: '1.5' }}>
            Location:
          </p>
          <p className="listingLocation" style={{ margin: 0, marginLeft: '5px', lineHeight: '1.5' }}>
            {listing.location}
          </p>
        </div>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
