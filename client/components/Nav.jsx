import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import SignUp from './signup.jsx'
// import SignIn from './signin.jsx'

class Nav extends Component {
  render () {
    return (
      <div>
        <Link to='/signin' className='btn btn-primary mr-2'>signin</Link>
        <Link to='/signup' className='btn btn-primary mr-2'>signup</Link>
        <a className='btn btn-primary mr-2' onClick={logout}>logout</a>
      </div>
    )
  }
}

function logout () {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

export default Nav
