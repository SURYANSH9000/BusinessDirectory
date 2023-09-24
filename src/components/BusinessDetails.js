import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BusinessDetails() {
  const { id } = useParams(); // Extract business ID from route parameter
  const [businessDetails, setBusinessDetails] = useState(null);

  useEffect(() => {
    // Fetch business details using the business ID
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3oDGX7GCHJKawKDQivdXBNTrhy9c6u68pisv5SQ1fX5k='
      }
    };

    fetch(`https://api.foursquare.com/v3/places/${id}`, options)
      .then(response => response.json())
      .then(data => {
        // Set the business details in state
        setBusinessDetails(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  // Render business details
  return (
    <div>
      {businessDetails ? (
        <div>
          <h1>{businessDetails.name}</h1>
          {/* Display other business details like rating, photos, contact number, address, etc. */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default BusinessDetails;
