import React, { Component } from 'react'
import Box from 'grommet/components/Box'

class About extends Component {
  constructor(props) {
    super(props)
  }
  
  render () {
    return (
      <Box justify='start'
        align='center'
        wrap={true}
        pad='medium'
        margin='small'
        colorIndex='light-2'>
        ABOUT.jsx
      </Box>
    )
  }
}

export default About
