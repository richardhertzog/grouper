import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      signedIn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    let { name, value } = event.target
    let newState = {}
    newState[name] = value
    this.setState(newState)
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(this.state, 'this.state')
    axios.post('/auth/signup', this.state)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      this.setState({signedIn: true})
    })
    .catch((err) => {
      console.err('error submitting signup:', err)
    })
  }

  render () {
    if (this.state.signedIn) {
      return (<Redirect to={'/'} />)
    }

    return (
      <div>
        <p>Sign Up</p>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>Username: </label>
            <input name='username' type='text' value={this.state.username} onChange={this.handleChange} required />
          </fieldset>
          <fieldset>
            <label>Password: </label>
            <input name='password' type='password' value={this.state.password} onChange={this.handleChange} required />
          </fieldset>
          <button action='submit'>Sign Up!</button>
        </form>
      </div>
    )
  }
}

export default SignUp
