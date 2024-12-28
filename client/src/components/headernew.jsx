import React, { useState } from 'react';
import amblem from '../assets/logo.png';
import '../styles/header.css';

const Header = () => {

  return (
    <>
      <header className="header-container">
        <div className="logo-container">
          <img src={amblem} alt="Logo" className="logo" />
        </div>
      </header>
    </>
  );
};

export default Header;