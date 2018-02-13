import React, { Component } from 'react';
import './Event.css';

class Event extends Component {
  render() {
    var start = new Date(this.props.start);
    var end = new Date(this.props.end);

    var weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = weekday[start.getDay()];


    return (
      <div className="event">
        <div className="title">{this.props.title}</div>
        <div className="time">{day} { start.getHours()}:{start.getMinutes() } - { end.getMinutes() }</div>
      </div>
    );
  }
}

export default Event;
