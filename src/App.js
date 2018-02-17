import React, { Component } from 'react';
import Countdown from './components/Countdown/Countdown.js';
import Schedule from './components/Schedule/Schedule.js';
import Navbar from './components/Navbar/Navbar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Navbar />
        <Countdown length='7200'/>
        <Schedule />
      </div>
    );
  }
}

export default App;
