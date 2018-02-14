import React, { Component } from 'react';
import LGear from '../../img/gear_left.svg'
import MidGear from '../../img/gear_mid.svg'
import RGear from '../../img/gear_right.svg'
import './Countdown.css';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.length
    };
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
        <img className="leftgear" src={LGear} alt="gear"/><div className="num hr">{hours}</div>
        <img className="middlegear" src={MidGear} alt="gear"/><div className="num min">{minutes}</div>
        <img className="rightgear" src={RGear} alt="gear"/><div className="num sec">{seconds}</div>
      </div>
    );
  }
}

export default Countdown;
