import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'
import App from 'grommet/components/App'
import Button from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <App>
        <Nav />
        <Link to='/makeGroup'>
          <Button icon={<AddIcon />}
            label='Create Group'
            href='#'
            primary />
        </Link>
      </App>
    )
  }
}

export default Home
