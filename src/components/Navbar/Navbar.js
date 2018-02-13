import React, { Component } from 'react';
import Logo from '../../img/logo.svg';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <img src={Logo} className="logo"/>
        <ul><a ></a></ul>
      </div>
    );
  }
}

export default Navbar;
