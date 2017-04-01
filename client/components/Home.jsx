import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/makeGroup">Make Group Will Become Button</Link>
        <br />
        <Link to="/voting">Votes Page Test Link</Link>
      </div>
    );
  }
}

export default Home;
