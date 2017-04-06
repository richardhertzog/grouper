import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import App from './App.jsx'
import Home from './components/Home.jsx'
import MakeGroup from './components/MakeGroup.jsx'
import Voting from './components/Voting.jsx'
import Waiting from './components/Waiting.jsx'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/makeGroup' component={MakeGroup} />
      <Route path='/voting' component={Voting} />
      <Route path='/waiting' component={Waiting} />
    </div>
  </Router>, document.getElementById('app'),
)
