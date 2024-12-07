import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../assets/Spinner.gif';
import ListingItem from '../components/listingItem';

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  // Fetch initial listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, 'listings');

        // Query to fetch the initial listings
        const q = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(5)
        );

        const querySnap = await getDocs(q);

        // Get the last visible document
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible); // Set lastFetchedListing for pagination

        const listings = [];

        querySnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    };

    fetchListings();
  }, [params.categoryName]);

  // Fetch more listings on "Load More"
  const onFetchMoreListings = async () => {
    try {
      const listingRef = collection(db, 'listings');

      // Query to fetch the next set of listings
      const q = query(
        listingRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing), // Fetch after the last fetched document
        limit(5)
      );

      const querySnap = await getDocs(q);

      // Get the new last visible document
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible); // Update the lastFetchedListing

      const newListings = [];

      querySnap.forEach((doc) => {
        newListings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      // Append new listings to the existing state
      setListings((prevState) => [...prevState, ...newListings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch more listings');
    }
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {loading ? (
        <img src={Spinner} alt="Loading..." />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
            <br />
            <br />
            {/* Load More Button */}
            {lastFetchedListing && (
              <p className="loadMore" onClick={onFetchMoreListings}>
                Load More
              </p>
            )}
          </main>
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
}

export default Offers;
