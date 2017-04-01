import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home.jsx';
import MakeGroup from './components/MakeGroup.jsx';
import GroupUrl from './components/GroupUrl.jsx';
import Voting from './components/Voting.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/makeGroup" component={MakeGroup} />
          <Route path="/groupUrl" votingUrl={'http://www.google.com'} component={GroupUrl} />
          <Route path="/voting" component={Voting} />
        </div>
      </Router>
    );
  }
}

export default App;
