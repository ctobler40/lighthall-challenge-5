import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  // useEffect(() => {
  //   showButton();
  // }, []);
  // window.addEventListener('resize', showButton);

  return (
    <nav className="navbar">
      <span className="navbar-brand mb-0 h1 mx-auto">LyricFinder</span>
    </nav>
  );
};

export default Navbar;

{/* <button className="navbar-button">Saved Songs</button>
      <button className="navbar-button">Sign Out</button> */}