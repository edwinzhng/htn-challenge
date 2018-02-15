import React, { Component } from 'react';
import './PersonalSchedule.css';

class PersonalSchedule extends Component {
  render() {
    var events = this.props.events;
    if(!events) {
      events = <div className="empty-queue">Add events to your personal queue by pressing the '+' button !</div>;
    }

    return (
      <div className="personal">
        <h3 className="personal-header">Your Events</h3>
        { events }
      </div>
    );
  }
}

export default PersonalSchedule;
