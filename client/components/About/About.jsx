import React, { Component } from 'react'

// grommet components
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'
import Heading from 'grommet/components/Heading'

// icons
import PreviousIcon from 'grommet/components/icons/base/Previous'

class About extends Component {
  constructor(props) {
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
          <Box 
            align='center'
            wrap={true}
            pad='none'
            margin='none'
          >
            <Heading align='center'> About Us </Heading>
        </Box>
      </Box>
    )
  }
}

export default About
