import React, { Component } from 'react'
import axios from 'axios'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groups: [],
      businesses: []
    }

    this.updateInfo = this.updateInfo.bind(this)
    this.updateInfo()
  }

  updateInfo () {
    axios.all([this.getGroups(), this.getBusinesses()])
    .then(axios.spread((groups, businesses) => {
      console.log(businesses)
      this.setState({
        groups: groups.data.groups,
        businesses: businesses.data.businesses
      })
    }))
  }

  getGroups () {
    let username = localStorage.getItem('username')
    return axios.post('/user/showGroups', { username })
  }

  getBusinesses () {
    let username = localStorage.getItem('username')
    return axios.post('/user/showBusinesses', { username })
  }

  render () {
    return (
      <div>
        <div>
          {this.state.groups.map((group, idx) => (<div key={idx}>{group.location}</div>))}
        </div>
        <div>
          {this.state.businesses.map((business, idx) => (<div key={idx}>{business.name}</div>))}
        </div>
      </div>
    )
  }
}

export default Profile
