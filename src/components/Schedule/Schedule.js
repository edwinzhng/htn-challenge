import React, { Component } from 'react';
import mobile from 'is-mobile';
import axios from 'axios';
import Event from '../Event/Event.js'
import Search from '../Search/Search.js'
import PersonalSchedule from '../PersonalSchedule/PersonalSchedule.js'
import ScheduleSelector from '../ScheduleSelector/ScheduleSelector.js'
import './Schedule.css';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      events: [],
      savedEvents: [],
      isSavedScheduleView: false,
      isMobile: false,
    }
    this.filterEvents = this.filterEvents.bind(this);
    this.changeToSaved = this.changeToSaved.bind(this);
    this.changeToEvents = this.changeToEvents.bind(this);
  }

  componentDidMount() {
    // get JSON file
    axios.get('https://hackthenorth.com/fe-schedule.json')
      .then(response => {
        this.setState({ data: response.data });
        this.initEvents();
      })
      .catch(function (error) {
        console.log(error);
      }
    );
    this.setState({
      isMobile: mobile(),
    });
    // render saved events if they already exist
    let local = JSON.parse(localStorage.getItem("savedEvents")),
        savedEvents = [];
    if(local !== null) {
      for(let i = 0; i < local.length; i++) {
        savedEvents.push(this.createEvent(local[i], local[i].id, true, false, false));
      }
      if (savedEvents != null) {
        this.setState({
          savedEvents: savedEvents,
        });
      }
    }
  }

  createEvent(data, dataIndex, isPersonal, isHidden, alreadyAdded) {
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
      alreadyAdded={alreadyAdded}
    />;
    return event;
  }

  initEvents() {
    let events = [], alreadyAdded = false, arr = [], data;
    for (let i = 0; i < this.state.data.length; i++) {
      data = this.state.data[i];
      arr = JSON.parse(localStorage.getItem("savedEvents"));
      // check if already in personal from localStorage
      if(arr !== null) {
        alreadyAdded = arr.find((element) => {
          return element.id === data.id;
        })
      }
      let event = this.createEvent(data, i, false, false, alreadyAdded === undefined ? false : true);
      events.push(event);
    }
    // sort events by date
    events.sort(function(a, b) {
      let startA = new Date(a.props.start), startB = new Date(b.props.start),
          endA = new Date(a.props.end), endB = new Date(b.props.end)
      let val = startA.getTime() - startB.getTime();
      if(val === 0) {
        val = endA.getTime() - endB.getTime(); // check end times if start times equal
      }
      return val;
    });
    this.setState({
      events: events,
    });
  }

  addPersonalEvent(id) {
    let newEvent = false,
        newSavedEvent = false,
        savedEvents = this.state.savedEvents.slice(),
        events = this.state.events.slice(),
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
        newSavedEvent = this.createEvent(this.state.data[i], i, true, false, true);
        newEvent = this.createEvent(this.state.data[i], i, false, false, true);
        // update localStorage with new event
        let local = [];
        local = JSON.parse(localStorage.getItem("savedEvents"));
        local.push(this.state.data[i]);
        localStorage.setItem("savedEvents", JSON.stringify(local));
        break;
      }
    }
    // find index to insert
    while(sortIndex < savedEvents.length) {
      let startA = new Date(newSavedEvent.props.start), startB = new Date(savedEvents[sortIndex].props.start),
          endA = new Date(newSavedEvent.props.end), endB = new Date(savedEvents[sortIndex].props.end);
      if(startA.getTime() > startB.getTime()) {
        sortIndex++;
      }
      else if(startA.getTime() === startB.getTime()) {
        if (endA.getTime() > endB.getTime()) {
          sortIndex++;
        }
        else { break; }
      }
      else { break; }
    }
    // insert event in order
    savedEvents.splice(sortIndex, 0, newSavedEvent);
    // set event icon to checkmark
    for(let i = 0; i < events.length; i++) {
      if(events[i].key === String(id)) {
        events.splice(i, 1, newEvent);
      }
    }
    this.setState({
      savedEvents: savedEvents,
      events: events,
    });
    return;
  }

  deleteEvent(id) {
    let savedEvents = this.state.savedEvents.slice(),
        events = this.state.events.slice(),
        newEvent, index, isHidden;
    // find event index and remove from savedEvents
    for(let i = 0; i < savedEvents.length; i++) {
      if(this.state.savedEvents[i].key === String(id)) {
        savedEvents.splice(i, 1);
      }
    }
    // find index and hidden property of event in main list
    for(let i = 0; i < events.length; i++) {
      if(this.state.events[i].key === String(id)) {
        index = i;
        isHidden = this.state.events[i].props.isHidden;
      }
    }
    // re-render event in main list without checkmark button
    for(let i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].id === id) {
        newEvent = this.createEvent(this.state.data[i], i, false, isHidden, false);
        break;
      }
    }
    events.splice(index, 1, newEvent);
    // delete event with id from savedEvents localStorage
    let local = JSON.parse(localStorage.getItem("savedEvents"));
    for(let i = 0; i < local.length; i++) {
      if(local[i].id === id) {
        local.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("savedEvents", JSON.stringify(local));

    this.setState((prevState) => ({
      savedEvents: savedEvents,
      events: events,
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

  // set mobile view to main schedule
  changeToEvents() {
    if(this.state.isSavedScheduleView) {
      this.setState({
        isSavedScheduleView: false,
      });
    }
  }
  // set mobile view to saved schedule
  changeToSaved() {
    if(!this.state.isSavedScheduleView) {
      this.setState({
        isSavedScheduleView: true,
      });
    }
  }

  render() {
    let scheduleSelector = this.state.isMobile ?
          <ScheduleSelector changeToSaved={this.changeToSaved} changeToEvents={this.changeToEvents} /> : null,
        search = <Search filterEvents={this.filterEvents}/>,
        savedSchedule = <PersonalSchedule events={this.state.savedEvents}/>

    return (
      <div className="all">
          { scheduleSelector }
        <div className="events">
          <div className={this.state.isMobile && this.state.isSavedScheduleView ? "hidden" : "schedule"}>
            { this.state.isMobile && this.state.isSavedScheduleView ? null : search}
            { this.state.isMobile && this.state.isSavedScheduleView ? null : this.state.events}
          </div>
          { this.state.isMobile ? (this.state.isSavedScheduleView ? savedSchedule : null) : savedSchedule}
        </div>
      </div>
    );
  }
}

export default Schedule;
