import React, { Component } from 'react';
import Countdown from './components/Countdown/Countdown.js';
import Schedule from './components/Schedule/Schedule.js';
import Navbar from './components/Navbar/Navbar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="nav">
          <Navbar />
        </div>
        <div className="header">
          <h2>Hacking begins in . . .</h2>
          <Countdown length='7200'/>
        </div>
        <div className="event-body">
          <Schedule />
        </div>
      </div>
    );
  }
}

export default App;
