import React, { Component } from 'react';
import './Countdown.css';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { time: this.props.length };
  }

  componentWillMount() {
    this.setState({
      time: this.props.length,        // reset to length (in seconds) on refresh
    })
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.decrement(), 1000    // 1 second interval to decrement countdown
    );
  }

  decrement() {
    if(this.state.time === 0) {
      clearInterval(this.timer);      // stop when countdown done
    }
    else {
      this.setState({
        time: this.state.time - 1,
      });
    }
  }

  render() {
    let hours = Math.floor(this.state.time / 3600),
        minutes = Math.floor((this.state.time % 3600) / 60),
        seconds = Math.floor(((this.state.time % 3600) % 60));

    return (
      <div className="countdown">
        <div className="row-of-3 hours">H: {("0" + hours).slice(-2)}</div>
        <div className="row-of-3 minutes">M: {("0" + minutes).slice(-2)}</div>
        <div className="row-of-3 seconds">S: {("0" + seconds).slice(-2)}</div>
      </div>
    );
  }
}

export default Countdown;
