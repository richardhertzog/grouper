import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'

class Home extends Component {
  render () {
    return (
      <div className='card'>
        <div className='card-block mx-auto'>
          <Nav />
          <div className='form-group row mx-auto'>
            <div className='btn-group btn-group-md'>
              <Link to='/makeGroup' className='btn btn-primary'>New Group</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
