import React, { Component } from 'react';
import Countdown from './components/Countdown/Countdown.js';
import Schedule from './components/Schedule/Schedule.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <header className="head">
          <h1 className="title">Hack the North - Frontend</h1>
          <h2 className="title">Hacking begins in . . .</h2>
          <Countdown length='7200'/>
        </header>
        <Schedule />
      </div>
    );
  }
}

export default App;
