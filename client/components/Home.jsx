import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class Home extends Component {
  render() {
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <Link to="/makeGroup">Make Group Will Become Button</Link>
          <br></br>
          <Link to="/voting">Votes Page Test Link</Link>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Home;
