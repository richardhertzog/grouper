import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import LoginForm from 'grommet/components/LoginForm'
import Box from 'grommet/components/Box'
import Heading from 'grommet/components/Heading'
import Anchor from 'grommet/components/Anchor'
import Paragraph from 'grommet/components/Paragraph'

// Icons
import LoginIcon from 'grommet/components/icons/base/Login'
import PreviousIcon from 'grommet/components/icons/base/Previous'

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
        pad='medium'
        margin='medium'
      >
        <Anchor 
          align='start'
          path='/'
          icon={<PreviousIcon />}
          label='Back' 
        />
        <Box 
          align='center'
          wrap={true}
          pad='none'
          margin='none'
        >
          <Heading align='center'> Sign Up </Heading>
          <LoginForm 
            onSubmit={this.handleSubmit}
            usernameType='text' 
          />
          <Anchor 
            path='/signin'
            icon={<LoginIcon />}
            label="Already have an account? Click here to Sign-In!"
          />
        </Box>
      </Box>
    )
  }
}

export default SignUp
