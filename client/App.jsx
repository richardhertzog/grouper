import React, { Component, PropTypes } from 'react'
// import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

// import App from './App.jsx'
import Home from './components/Home.jsx'
import MakeGroup from './components/MakeGroup.jsx'
import Voting from './components/Voting.jsx'
import Waiting from './components/Waiting.jsx'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {

    // axios.get('/api/groups/' + this.props.location.pathname.slice(8))
    // .then((res) => {
    //   this.setState({ yelpApiData: res.data })
    // }
  }

  render () {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/makeGroup' component={MakeGroup} />
            <Route path='/voting' component={Voting} />
            <Route path='/waiting' render={() => { return <Waiting name='ZergRUSH!!' /> }} />
          </div>
        </Router>
      </div>
    )
  }
}

App.propTypes = {

}

export default App
