import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class GroupUrl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href={this.props.votingUrl}>Go here to vote!</a>
      </div>
    );
  }
}

export default GroupUrl;
