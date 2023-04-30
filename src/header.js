import React from 'react';
import './index.css';
import './style.css';
import logo from './images/morganlogo.jpeg';

export default function Header() {
  const handleAboutClick = () => {
    window.location.href = 'https://www.forthepeople.com/who-we-are/';
  };

  return (
    <div id="navBar">
      <a style={{ textDecoration: 'none', color: 'inherit' }} href="index.html">
        <div id="homeButtonContainer">
          <img id="logo" src={logo} alt="Morgan and Morgan Logo" />
        </div>
      </a>

      <div style={{ marginLeft: 'auto' }}>
        <button className="aboutButton" onClick={handleAboutClick}>
          About
        </button>
      </div>
    </div>
  );
}
