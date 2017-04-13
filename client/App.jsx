import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home.jsx'
import MakeGroup from './components/MakeGroup.jsx'
import RootVoting from './components/RootVoting.jsx'
import SignUp from './components/SignUp.jsx'
import SignIn from './components/SignIn.jsx'
import Chat from './components/Chat.jsx'

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
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/chat' component={Chat} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
