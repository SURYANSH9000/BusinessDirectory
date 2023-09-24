import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged from Firebase auth
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import SearchBar from './components/SearchBar'; // Import the SearchBar component
import BusinessListing from './components/BusinessListing';
import BusinessDetails from './components/BusinessDetails'; // Import the BusinessDetails component
import './App.css';
import bgImage from './images/bg.jpeg';
import Profile from './components/Profile';
import { auth } from './firebase'; // Import the Firebase auth object

async function getLocationCoordinates(location) {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
    console.log('Nominatim Response:', response.data); // Add this line
    if (response.data.length > 0) {
      return { lat: response.data[0].lat, lon: response.data[0].lon };
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const FOURSQUARE_API_URL = 'https://api.foursquare.com/v3/places/search';

async function placeSearch(query, location) {
  try {
    const coordinates = await getLocationCoordinates(location);

    if (!coordinates) {
      console.error('Could not retrieve coordinates for the location:', location);
      return [];
    }

    const options = {
      method: 'GET',
      url: FOURSQUARE_API_URL,
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3oDGX7GCHJKawKDQivdXBNTrhy9c6u68pisv5SQ1fX5k='
      },
      params: {
        ll: `${coordinates.lat},${coordinates.lon}`,
        query: query,
        open_now: 'true', // Include open_now parameter
        sort: 'DISTANCE'  // Include sort parameter
      }
    };

    const response = await axios.request(options); // Fetch the data using axios
    const businesses = response.data.results.map(business => ({
      id: business.fsq_id,
      name: business.name,
      distance: business.distance,
      location: business.location,
      contactNumber: business.contact_number, // Adjust the property name based on API response
      categories: business.categories,
    }));
    return businesses;
  } catch (err) {
    console.error(err);
    return [];
  }
}

function App() {
  const history = useHistory(); // Get the history object
  const [user, setUser] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, []);



  const handleLogout = () => {
    // Sign out the user from Firebase
    auth.signOut().then(() => {
      // Update the user state to null
      setUser(null);

      // Remove user data from local storage (if needed)
      localStorage.removeItem('user');

      // Close the sidebar
      setShowSidebar(false);

      // Clear search results
      setFilteredBusinesses([]);

      // Reset the flag
      setShowNoResultsMessage(false);
      window.location.href = '/';
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  };


  const handleHamburgerClick = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearch = async (query, location) => {
    console.log('Searching for:', query, 'in', location);
    try {
      const businesses = await placeSearch(query, location);
      console.log('API Response:', businesses);
      setFilteredBusinesses(businesses);
      setShowNoResultsMessage(businesses.length === 0); // Set the flag
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <Router>
      <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
  {user ? (
    <div className={`side-navbar ${showSidebar ? 'show' : ''}`}>
      <div className="hamburger-icon" onClick={handleHamburgerClick}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Go Back</Link></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li>
        </ul>
      </nav>
    </div>
  ) : null}
  {user && <Profile user={user} handleLogout={handleLogout} />}
</Route>


          <Route path="/">
            <Header user={user} onLogout={handleLogout} />
            <div className="page-content">
              {user && (
                <div className={`side-navbar ${showSidebar ? 'show' : ''}`}>
                  <div className="hamburger-icon" onClick={handleHamburgerClick}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  {user && (
                    <nav>
                      <ul>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><a href="#logout" onClick={handleLogout}>Logout</a></li>
                      </ul>
                    </nav>
                  )}
                </div>
              )}
              <div className="main-content">
                {user && (
                  <div className={`search-bar ${filteredBusinesses.length > 0 ? 'centered' : ''}`}>
                    <SearchBar onSearch={handleSearch} />
                  </div>
                )}
                <Switch>
                  <Route path="/profile">
                    {/* Your Profile Component */}
                  </Route>
                  <Route path="/">
                    {user ? (
                      <div className="welcome-message">
                        {/* Content of Home Page */}
                      </div>
                    ) : (
                      <div className="login-section">
                        <Login />
                        <p className="register-link">Don't have an account? <Link to="/register">Register here</Link></p>
                      </div>
                    )}
                  </Route>
                </Switch>
                {showNoResultsMessage && (
                  <p>No results found</p>
                )}
                {filteredBusinesses.length > 0 && (
                  <div className="business-list">
                    <BusinessListing filteredBusinesses={filteredBusinesses} />
                  </div>
                )}
              </div>
            </div>
          </Route>
          <Route path="/business/:id">
            <BusinessDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
