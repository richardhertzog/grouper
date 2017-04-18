import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import checkAuth from './service/checkAuth.js'
import Button from 'grommet/components/Button'
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
      <Button icon={<LogoutIcon />}
        label='Logout'
        href='#'
        onClick={this.logsout}
        secondary />
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
         <Box flex={true}
          justify='start'
          direction='row'
          responsive={true}>
          <Title>
            Grüper
          </Title>
        </Box>
        <Box flex={true}
          align='end'
          justify='end'
          
          responsive={true}>
          <Menu icon={<MenuIcon />}
            dropAlign={{"right": "right"}}>
            <Anchor href='#'
              className='active'>
              {!this.state.signedIn && this.signin()}
            </Anchor>
            <Anchor href='#'>
              {!this.state.signedIn && this.signup()}
            </Anchor>
            <Anchor href='#'>
              {!!this.state.signedIn && this.logout()}
            </Anchor>
          </Menu>
        </Box>
      </Header>
    )
  }
}

export default Nav
