import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'

class Home extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-block mx-auto'>
          <div className='form-group row mx-auto'>
            <div className='btn-group btn-group-md'>
              <Nav />
            </div>
            <div className='btn-group btn-group-md mr-2'>
              <Link to='/makeGroup' className='btn btn-primary'>New Group</Link>
            </div>
            <div className='btn-group btn-group-md'>
              <Link to='/chat' className='btn btn-primary'>Chat</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
