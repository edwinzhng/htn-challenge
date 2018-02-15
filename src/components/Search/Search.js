import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  render() {
    return (
      <div className="searchbar">
        <input id="search" type="text" placeholder="Search ..." onChange={this.props.filterEvents}/>
      </div>
    );
  }
}

export default Search;
