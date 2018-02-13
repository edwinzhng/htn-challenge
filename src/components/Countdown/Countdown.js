import React, { Component } from 'react';
import Gear from '../../img/gear.svg'
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

        hours = ("0" + hours).slice(-2);
        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);

    return (
      <div className="countdown">
        <h2>Hacking Begins in . . .</h2>
        <div className="countdown-row hrs"><img className="gear" src={Gear} alt="gear"/>{hours}</div>
        <div className="countdown-row min"><img className="middlegear" src={Gear} alt="gear"/>{minutes}</div>
        <div className="countdown-row sec"><img className="gear" src={Gear} alt="gear"/>{seconds}</div>
      </div>
    );
  }
}

export default Countdown;
