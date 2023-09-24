import React from 'react';
import BusinessListingItem from './BusinessListingItem';

function BusinessListing({ filteredBusinesses }) {
  const halfIndex = Math.ceil(filteredBusinesses.length / 2);

  const leftBusinesses = filteredBusinesses.slice(0, halfIndex);
  const rightBusinesses = filteredBusinesses.slice(halfIndex);

  return (
    <div className="business-list">
      {filteredBusinesses.length > 0 ? ( // Check if there are search results
        <>
          <h2>Business Listings</h2>
          <div className="business-cards-container">
            <div className="business-cards-column">
              {leftBusinesses.map((business) => (
                <BusinessListingItem key={business.id} business={business} />
              ))}
            </div>
            <div className="business-cards-column">
              {rightBusinesses.map((business) => (
                <BusinessListingItem key={business.id} business={business} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>No results found.</p> // Display "No results found" message
      )}
    </div>
  );
}


export default BusinessListing;
