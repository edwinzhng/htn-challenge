import React, { Component } from 'react';
import axios from 'axios';
import './Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    }
  }

  componentDidMount() {
    axios.get('https://hackthenorth.com/fe-schedule.json')
      .then(response => {
        this.setState( { data: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let events = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let event = this.state.data[i].title;
      events.push(event);
    }

    return (
      <div className="schedule">
        { events }
      </div>
    );
  }
}

export default Schedule;
