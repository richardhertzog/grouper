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

  componentDidMount () {
    this.setState({ groupName: this.props.location.pathname.slice(8)})
    let groupName = this.props.location.pathname.slice(8)
    if (sessionStorage.getItem(groupName) === null) {
      axios.get('/api/groups/' + groupName)
      .then((res) => {
        res.data.index = 0
        console.log('res.data saved to ', res.data)
        sessionStorage.setItem(groupName, JSON.stringify(res.data))
      })
      .catch((err) => {
        console.error('axios get error', err)
      })
    }
  }

  render () {
    return (
      <div>
        <Router>
          <div>
            <Route path='/waiting' render={() => { return <Waiting name='ZergRUSH!!' /> }} />
            <Route path='/voting' render={() => { return <Voting groupName={this.state.groupName} yelpData={JSON.parse(sessionStorage.getItem(this.state.groupName))} /> }} />
          </div>
        </Router>
      </div>
    )
  }
}

componentName.propTypes = {

}

export default componentName
