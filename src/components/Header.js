import React from 'react';
import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <h1 className="business-directory">Business Directory</h1>
    </header>
  );
}

export default Header;
