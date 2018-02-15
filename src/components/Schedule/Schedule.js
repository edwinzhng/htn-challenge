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
      events: [],
      savedEvents: [],
    }
    this.filterEvents = this.filterEvents.bind(this);
  }

  componentWillMount() {
    axios.get('https://hackthenorth.com/fe-schedule.json')
      .then(response => {
        this.setState({ data: response.data });
        this.initEvents();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createEvent(data, dataIndex, isPersonal, isHidden) {
    let event = <Event
      key={data.id}
      dataIndex={dataIndex}
      title={data.title}
      start={data.start_time}
      end={data.end_time}
      description={data.description}
      location={data.location}
      tags={data.tags}
      addPersonalEvent={() => this.addPersonalEvent(data.id)}
      deleteEvent={() => this.deleteEvent(data.id)}
      isPersonal={isPersonal}
      isHidden={isHidden}
    />;
    return event;
  }

  initEvents() {
    let events = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let event = this.createEvent(this.state.data[i], i, false, false);
      events.push(event);
    }
    // sort events by date
    events.sort(function(a, b) {
      let startA = new Date(a.props.start_time), startB = new Date(b.props.start_time),
          endA = new Date(a.props.end_time), endB = new Date(a.props.end_time);

      return startA > startB ? -1 :    // a larger than b if start time is later
              startA < startB ? 1 :    // smaller if start time is earlier
              endA > endB ? -1 :       // larger if start times equal but end time later
              endA < endB ? 1 : 0;     // smaller if start times equal but end time earlier
    });
    this.setState({
      events: events,
    });
  }

  addPersonalEvent(id) {
    let newEvent = false,
        savedEvents = this.state.savedEvents.slice(),
        sortIndex = 0;
    // check if event is already saved
    for(let i = 0; i < this.state.savedEvents.length; i++) {
      if(this.state.savedEvents[i].key === String(id)) {
        return;
      }
    }
    // find event from data
    for(let i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].id === id) {
        newEvent = this.createEvent(this.state.data[i], i, true, false);
        break;
      }
    }
    // find index to insert
    while(sortIndex < savedEvents.length) {
      let startA = new Date(newEvent.props.start), startB = new Date(savedEvents[sortIndex].props.start),
          endA = new Date(newEvent.props.end), endB = new Date(savedEvents[sortIndex].props.end);
      if(startA > startB) {
        sortIndex++;
      }
      else if(startA === startB) {
        if (endA > endB) {
          console.log("horray");
          sortIndex++;
        }
        else { break; }
      }
      else { break; }
    }
    // insert event in order
    savedEvents.splice(sortIndex, 0, newEvent);
    this.setState({
      savedEvents: savedEvents,
    });
    return;
  }

  deleteEvent(id) {
    let savedEvents = this.state.savedEvents.slice();
    for(let i = 0; i < savedEvents.length; i++) {
      if(this.state.savedEvents[i].key === String(id)) {
        savedEvents.splice(i, 1);
      }
    }
    this.setState((prevState) => ({
      savedEvents: savedEvents,
    }));
  }

  // brute force checking for matching strings xd
  filterEvents() {
    let filterText = document.getElementById('search').value.toLowerCase();
    let events = this.state.events.slice();
    for(let i = 0; i < events.length; i++) {
      if( String(events[i].props.title).toLowerCase().search(filterText) === -1 &&
          String(events[i].props.tags).toLowerCase().search(filterText) === -1 &&
          String(events[i].props.description).toLowerCase().search(filterText) === -1 &&
          String(events[i].props.location).toLowerCase().search(filterText) === -1)
      {
        if(!events[i].props.isHidden) {
          let event = this.createEvent(this.state.data[events[i].props.dataIndex], events[i].props.dataIndex, false, true);
          events.splice(i, 1, event);
        }
      }
      else {
        if(events[i].props.isHidden) {
          let event = this.createEvent(this.state.data[events[i].props.dataIndex], events[i].props.dataIndex, false, false);
          events.splice(i, 1, event);
        }
      }
    }
    this.setState({
      events: events,
    });
  }

  render() {
    return (
      <div className="events">
        <div className="schedule">
          <Search filterEvents={this.filterEvents}/>
          { this.state.events }
        </div>
        <PersonalSchedule events={this.state.savedEvents}/>
      </div>
    );
  }
}

export default Schedule;
