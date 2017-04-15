import React, { Component } from 'react'
import Box from 'grommet/components/Box'

class Container extends Component {
  render () {
    return (
      <Box justify='start'
        align='center'
        wrap
        full
        pad='medium'
        margin='small'
        colorIndex='light-2'>
        {this.props.children}
      </Box>
    )
  }
}

export default Container
