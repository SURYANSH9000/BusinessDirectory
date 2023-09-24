import React from 'react';
import { Link } from 'react-router-dom';

function BusinessListingItem({ business }) {
  const fsqId = business.fsq_id; // Get the Foursquare ID from the business object
  const url = `/business/${business.fsq_id}`; // Construct the URL for React Router

  return (
    <div className="business-listing-item">
      <Link to={url} className="business-link" target="_blank" rel="noopener noreferrer">
        {/* Use target="_blank" to open the link in a new tab */}
        <h3>{business.name}</h3>
        {business.distance && <p>Distance: {business.distance} meters</p>}
        {business.location && business.location.formatted_address && (
          <p>Address: {business.location.formatted_address}</p>
        )}
        {business.categories && business.categories.length > 0 && (
          <img
            src={
              business.categories[0].icon.prefix + '32' + business.categories[0].icon.suffix
            }
            alt={`${business.name} Icon`}
          />
        )}
      </Link>
    </div>
  );
}

export default BusinessListingItem;
