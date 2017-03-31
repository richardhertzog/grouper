import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/makeGroup" className="makeGroupButton">Make Group</Link>
      </div>
    );
  }
}

export default Home;
