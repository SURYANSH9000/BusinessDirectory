import React from 'react';

function Profile({ user }) {
  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default Profile;
