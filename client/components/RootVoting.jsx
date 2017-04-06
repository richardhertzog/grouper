import React, { Component, PropTypes } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Voting from './Voting.jsx'

class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: ''
    }
  }
  componentDidMount () {
    this.setState({groupName: this.props.location.pathname })
  }
  render () {
    return (
      <div>
        <h1>RootVoting</h1>
        <p>{this.state.groupName}</p>
        <Router>
          <div>
            <Route path='/waiting' render={() => { return <Waiting name='ZergRUSH!!' /> }} />
            <Route path='/voting' component={Voting} />
          </div>
        </Router>
      </div>
    )
  }
}

componentName.propTypes = {

}

export default componentName
