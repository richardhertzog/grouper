import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import checkAuth from './service/checkAuth.js'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signedIn: false
    }

    this.logsout = this.logsout.bind(this)
  }

  componentWillMount () {
    checkAuth().then(signedIn => this.setState({signedIn}))
  }

  signin () {
    return (<Link to='/signin' className='btn btn-primary mr-2'>signin</Link>)
  }

  signup () {
    return (<Link to='/signup' className='btn btn-primary mr-2'>signup</Link>)
  }

  logout () {
    return (<div onClick={this.logsout} className='btn btn-primary mr-2'>logout</div>)
  }

  logsout () {
    this.setState({signedIn: false})
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  render () {
    console.log(this.state.signedIn)
    return (
      <div>
        {!this.state.signedIn && this.signin()}
        {!this.state.signedIn && this.signup()}
        {!!this.state.signedIn && this.logout()}
      </div>
    )
  }
}

export default Nav
