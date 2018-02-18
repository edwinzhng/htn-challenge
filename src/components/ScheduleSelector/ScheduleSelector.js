import React, { Component } from 'react';
import './ScheduleSelector.css';

class ScheduleSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEventsSelected: true,
    }
  }

  selectEvents() {
    this.setState({
      isEventsSelected: true,
    });
  }

  selectSaved() {
    this.setState({
      isEventsSelected: false,
    });
  }

  render() {
    return (
      <div className="selector">
        <button
          className={this.state.isEventsSelected ? "selectEvents selected" : "selectEvents notSelected"}
          onClick={() => { this.props.changeToEvents(); this.selectEvents() }}>
          All Events
        </button>
        <button
          className={this.state.isEventsSelected ? "selectSaved notSelected" : "selectSaved selected"}
          onClick={() => { this.props.changeToSaved(); this.selectSaved() }}>
          Saved
        </button>
      </div>
    );
  }
}

export default ScheduleSelector;
