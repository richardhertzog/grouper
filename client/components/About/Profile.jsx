import React, { Component } from 'react'

// grommet components
import Article from 'grommet/components/Article'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'
import Card from 'grommet/components/Card'
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'

class Profile extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Box
        basis='full'
        align='center'
        margin='small'
        pad='medium'
        colorIndex='light-2'>
        <Card label={this.props.name}
          description="Meet Grüper's Amazing team!"
          link={<Anchor path='/'
          primary
          label='Learn More!' />} />
      </Box>
    )
  }
}

export default Profile
