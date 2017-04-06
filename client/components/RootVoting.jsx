import React, { Component, PropTypes } from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import Voting from './Voting.jsx'
import axios from 'axios'

class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      group: undefined
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
        return res
      })
      .then((res) => {
        console.log('state set')
        this.setState({group: sessionStorage.getItem(groupName)})
      })
      .catch((err) => {
        console.error('axios get error', err)
      })
    }
  }

  render () {
    if (this.state.group === undefined){
      return (
        <h1>LOADING</h1>
      )
    } else {
      return (
        <div>
          <Router>
            <div>
              <Route path='/waiting' render={() => { return <Waiting name='ZergRUSH!!' /> }} />
              <Route path='/voting' render={() => { return <Voting groupName={this.state.groupName} yelpData={this.state.group} /> }} />
            </div>
          </Router>
        </div>
      )
    }
  }
}

componentName.propTypes = {

}

export default componentName
