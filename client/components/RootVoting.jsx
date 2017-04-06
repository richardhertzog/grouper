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
      console.log(res.data)
      sessionStorage.setItem('yelpData', JSON.stringify(res.data))
    })
    .catch((err) => {
      console.error('axios get error', err)
    })

    this.setState({ groupName: this.props.location.pathname })
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
