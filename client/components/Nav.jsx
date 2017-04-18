import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import checkAuth from './service/checkAuth.js'

// grommet
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Anchor from 'grommet/components/Anchor'
import Title from 'grommet/components/Title'
import Menu from 'grommet/components/Menu'

// Icons
import MenuIcon from 'grommet/components/icons/base/Menu';
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
      <Anchor 
        path='/signin'
        className='active'
        icon={<LoginIcon />}
      >
        Sign-In
      </Anchor>
    )
  }

  signup () {
    return (
      <Anchor 
        path='/signup'
        icon={<LoginIcon />}
      >
        Sign-Up
      </Anchor>
    )
  }

  logout () {
    return (
      <Anchor 
        path='/Logout'
        icon={<LogoutIcon />}
      >
        Log-Out
      </Anchor>
    )
  }

  logsout () {
    this.setState({signedIn: false})
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  render () {
    return (
      <Header float={false}
        fixed={true}>
          <Box 
            flex={true}
            align='start'
            justify='start'
            margin='medium'
            pad='small'
            responsive={true}
          >
            <Anchor 
              path='/'
            >
              <Title>Grüper</Title>
            </Anchor>
          </Box>
          <Box 
            flex={true}
            align='end'
            justify='end'
            margin='medium'
            responsive={true}
          >
            <Menu icon={<MenuIcon />}
              dropAlign={{"right": "right"}}>
              {!this.state.signedIn && this.signin()}
              {!this.state.signedIn && this.signup()}
              {!!this.state.signedIn && this.logout()}
            </Menu>
          </Box>
      </Header>
    )
  }
}

export default Nav
