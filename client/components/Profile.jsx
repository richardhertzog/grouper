import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groups: [],
      businesses: []
    }
  }

  componentWillMount () {
    axios.all([this.getGroups(), this.getBusinesses()])
    .then(axios.spread(function (groups, businesses) {
      this.setState({ groups: groups, businesses: businesses })
    }))
    console.log('this.state in profile before mount', this.state)
  }

  getGroups () {
    return axios.get('/user/showGroups')
  }

  getBusinesses () {
    return axios.get('/user/showBusinesses')
  }

  render () {
    return (
      <div>
        <div>
          {this.state.groups}
        </div>
        <div>
          {this.state.businesses}
        </div>
      </div>
    )
  }
}

export default Profile
