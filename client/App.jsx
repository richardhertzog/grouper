import React, { Component, PropTypes } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Home from './components/Home.jsx'
import MakeGroup from './components/MakeGroup.jsx'
import RootVoting from './components/RootVoting.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/makeGroup' component={MakeGroup} />
            <Route path='/voting' component={RootVoting} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
