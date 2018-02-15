import React, { Component } from 'react';
import './PersonalSchedule.css';

class PersonalSchedule extends Component {
  render() {
    let events = this.props.events;
    let renderedEvents = false;
    if(events.length < 1) {
      renderedEvents = <div className="empty-queue">Add events to your personal queue by pressing the '+' button !</div>;
    }

    return (
      <div className="personal">
        <h3 className="personal-header">Your Events</h3>
        { renderedEvents }
      </div>
    );
  }
}

export default PersonalSchedule;
