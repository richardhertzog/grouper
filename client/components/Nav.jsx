import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import checkAuth from './service/checkAuth.js'
import Button from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import LoginIcon from 'grommet/components/icons/base/Login'
import LogoutIcon from 'grommet/components/icons/base/Logout'

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
    return (
      <Link to='/signin'>
        <Box pad='medium'
          colorIndex='light-2'>
          <Button icon={<LoginIcon />}
            label='Sign In'
            href='#'
            secondary />
        </Box>
      </Link>
    )
  }

  signup () {
    return (
      <Link to='/signup'>
        <Box pad='medium'
          colorIndex='light-2'>
          <Button icon={<LoginIcon />}
            label='Sign Up'
            href='#'
            secondary />
        </Box>
      </Link>
    )
  }

  logout () {
    return (
      <Box pad='medium'
        colorIndex='light-2'>
        <Button icon={<LogoutIcon />}
          label='Logout'
          href='#'
          onClick={this.logsout}
          secondary />
      </Box>
    )
  }

  logsout () {
    this.setState({signedIn: false})
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  render () {
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
