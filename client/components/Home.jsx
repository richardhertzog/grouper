import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Box direction='row'
        align='center'
        wrap
        pad='medium'
        margin='small'>
        <Nav />
        <Link to='/makeGroup'>
          <Button icon={<AddIcon />}
            label='Create Group'
            href='#'
            primary />
        </Link>
      </Box>
    )
  }
}

export default Home
