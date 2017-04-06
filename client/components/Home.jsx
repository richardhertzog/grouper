import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    return (
      <div>
        <div className='card'>
          <div className='card-block mx-auto'>
            <div className='form-group row mx-auto'>
              <div className='btn-group btn-group-md'>
                <Link to='/makeGroup' className='btn btn-primary'>New Group</Link>
              </div>
            </div>
            <br />
            <Link to='/voting'>Votes Page Test Link</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
