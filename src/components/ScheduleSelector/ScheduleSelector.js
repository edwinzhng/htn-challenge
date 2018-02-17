import React, { Component } from 'react';
import './ScheduleSelector.css';

class ScheduleSelector extends Component {
  render() {
    return (
      <div className="selector">
        <button className="selectEvents" onClick={this.props.changeToEvents}>All Events</button>
        <button className="selectSaved" onClick={this.props.changeToSaved}>Saved</button>
      </div>
    );
  }
}

export default ScheduleSelector;
