import React, { Component } from 'react';
import axios from 'axios';
import Event from '../Event/Event.js'
import Search from '../Search/Search.js'
import PersonalSchedule from '../PersonalSchedule/PersonalSchedule.js'
import './Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    }
  }

  componentWillMount() {
    axios.get('https://hackthenorth.com/fe-schedule.json')
      .then(response => {
        this.setState({ data: response.data });
        this.setEvents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createEvent(data) {
    let event = <Event
      key={data.id}
      title={data.title}
      start={data.start_time}
      end={data.end_time}
      description={data.description}
      location={data.location}
      tags={data.tags}
    />;
    return event;
  }

  setEvents() {
    var events = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let event = this.createEvent(this.state.data[i]);
      events.push(event);
    }
    // sort events by date
    events.sort(function(a, b) {
      var startA = new Date(a.props.start_time);
      var startB = new Date(b.props.start_time);
      var endA = new Date(a.props.end_time);
      var endB = new Date(a.props.end_time);
      return startA > startB ? -1 :    // a larger than b if start time is later
              startA < startB ? 1 :    // smaller if start time is earlier
              endA > endB ? -1 :       // larger if start times equal but end time later
              endA < endB ? 1 : 0;     // smaller if start times equal but end time earlier
    });
    return events;
  }

  render() {
    return (
      <div className="events">
        <div className="schedule">
          <Search />
          { this.setEvents() }
        </div>
        <PersonalSchedule />
      </div>
    );
  }
}

export default Schedule;
