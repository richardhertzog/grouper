import React, { Component, PropTypes } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Voting from './Voting.jsx'
import axios from 'axios'

class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: ''
    }
  }

  componentWillMount () {
    axios.get('/api/groups/' + this.props.location.pathname.slice(8))
    .then((res) => {
      res.data.index = 0
      console.log('res.data saved to ', res.data)
      sessionStorage.setItem('yelpData', JSON.stringify(res.data))
      this.setState({ groupName: res.data.groupName})
    })
    .catch((err) => {
      console.error('axios get error', err)
    })
  }

  render () {
    return (
      <div>
        <h1>RootVoting</h1>
        <p>{this.state.groupName}</p>
        <p>{}</p>
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
