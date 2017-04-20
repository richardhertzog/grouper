import React, { Component } from 'react'

// grommet components
import Article from 'grommet/components/Article'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'
import Card from 'grommet/components/Card'
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'
import Image from 'grommet/components/Image'

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
          thumbnail={<Image src={this.props.profilePhoto} fit='cover' full />}
          description={this.props.description} />
          <Box>
            <Anchor href={this.props.githubUrl}
            primary
            label='GitHub!' />
          </Box>
          <Box>
            <Anchor href={this.props.linkedinUrl}
            primary
            label='linked In!' />
          </Box>
      </Box>
    )
  }
}

export default Profile
