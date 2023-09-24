import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(query, location); // Pass location to the onSearch function
  };

  return (
    <div className="search-bar-container">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search Business"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="separator"></div>
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
