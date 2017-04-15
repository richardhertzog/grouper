import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import LoginForm from 'grommet/components/LoginForm'
import Box from 'grommet/components/Box'
class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signedIn: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    delete event.rememberMe
    axios.post('/auth/signup', event)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      this.setState({ signedIn: true })
    })
    .catch((err) => {
      console.error('error submitting signup:', err)
    })
  }

  render () {
    if (this.state.signedIn) {
      return (<Redirect to={'/'} />)
    }

    return (
      <Box justify='center'
        align='center'
        full
        pad='medium'
        margin='small'>
        <LoginForm onSubmit={this.handleSubmit}
          usernameType='text' />
      </Box>
    )
  }
}

export default SignUp
