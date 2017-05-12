import React, { Component } from 'react'

// app components
import ProfileList from './ProfileList.jsx'

// grommet components
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'

// icons
import PreviousIcon from 'grommet/components/icons/base/Previous'

class About extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Box justify='center'
        pad='medium'
        margin='medium'>
        <Anchor
          align='start'
          path='/'
          icon={<PreviousIcon />}
          label='Back' />
        <Box align='center'
          wrap
          pad='none'
          margin='none'>
          <ProfileList />
        </Box>
      </Box>
    )
  }
}

export default About
