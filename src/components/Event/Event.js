import React, { Component } from 'react';
import Ionicon from 'react-ionicons'
import './Event.css';

class Event extends Component {
  render() {
    let start = new Date(this.props.start),
        end = new Date(this.props.end),
        weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        day = weekday[start.getDay()],
        starthour = start.getHours(),
        startmin = start.getHours(),
        endhour = end.getHours(),
        endmin = end.getMinutes();

        starthour = starthour < 10 ? '0' + starthour : starthour;
        startmin = startmin < 10 ? '0' + startmin : startmin;
        endhour = endhour < 10 ? '0' + endhour : endhour;
        endmin = endmin < 10 ? '0' + endmin : endmin;

    let color = "blue";  // default to blue
    if(this.props.tags.includes("logistics") || this.props.tags.includes("judging")) {
      color = "blue";
    }
    else if(this.props.tags.includes("workshop")) {
      color = "teal";
    }
    else if(this.props.tags.includes("food")) {
      color = "green";
    }
    else if(this.props.tags.includes("lightning_challenge")) {
      color = "yellow";
    }
    else if(this.props.tags.includes("talk")) {
      color = "purple";
    }
    else if(this.props.tags.includes("meetup")) {
      color = "red";
    }

    return (
      <div className={"event " + color}>
        <div className="content">
          <div className="toprow">
            <div className="title">{this.props.title}</div>
            <div className="time">
              {day} | {starthour}:{startmin} - {endhour}:{endmin}
            </div>
          </div>
          <div className="bottomrow">
            <div className="description">{this.props.description}</div>
            <div className="location">{this.props.location}</div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={this.props.isPersonal ? this.props.deleteEvent : this.props.addPersonalEvent}>
            { this.props.isPersonal ?
                <Ionicon icon="md-trash" fontSize="40px" color="#ddd" className="delete"/> :
                <Ionicon icon="md-add" fontSize="40px" color="#ddd" className="add"/>
            }
          </button>
        </div>
      </div>
    );
  }
}

export default Event;
