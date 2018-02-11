import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 7200 }; // number of seconds in two hours
  }

  componentWillMount() {
    this.state.
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="countdown">
        <div className="hours"> </div>
        <div className="minutes"> </div>
        <div className="seconds"> </div>
      </div>
    );
  }
}

export default Countdown;
