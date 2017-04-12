import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signedIn: false
    }

    this.checkCredentials = this.checkCredentials.bind(this)
  }

  checkCredentials () {
  }

  signin () {
    return (<Link to='/signin' className='btn btn-primary mr-2'>signin</Link>)
  }

  signup () {
    return (<Link to='/signup' className='btn btn-primary mr-2'>signup</Link>)
  }

  logout () {
    this.setState({signedIn: false})
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    return (<Redirect to='/' className='btn btn-primary mr-2'>logout</Redirect>)
  }

  render () {
    return (
      <div>
        {!this.state.signedIn && this.signin()}
        {!this.state.signedIn && this.signup()}
        {this.state.signedIn && this.logout()}
      </div>
    )
  }
}

export default Nav
