import React, { Component } from 'react';
import Logo from '../../img/logo.svg';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img src={Logo} className="logo" alt="HTN Logo"/>
        <div className="links">Hack the North - Frontend Challenge</div>
      </div>
    );
  }
}

export default Navbar;
