import React, { Component } from 'react'
import axios from 'axios'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
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

  handleSubmit () {

  }

  render () {
    return (
      <div>
        <p>SignIn!!!</p>
        <form>
          <fieldset>
            <label>username: </label>
            <input name='username' type='text' value={this.state.username} onChange={this.handleChange} required />
          </fieldset>
          <fieldset>
            <label>password: </label>
            <input name='password' type='password' value={this.state.password} onChange={this.handleChange} required />
          </fieldset>
          <button action='submit' onSubmit={this.handleSubmit}>SignUp!</button>
        </form>
      </div>
    )
  }
}

export default SignUp
