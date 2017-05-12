import React, { Component } from 'react'

// grommet components

import Card from 'grommet/components/Card'
import Box from 'grommet/components/Box'
import Image from 'grommet/components/Image'
import SocialLinkedinIcon from 'grommet/components/icons/base/SocialLinkedin'
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub'
import Button from 'grommet/components/Button'
import Heading from 'grommet/components/Heading'
import Paragraph from 'grommet/components/Paragraph'

class Profile extends Component {
  constructor (props) {
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
        <Heading
          tag='h6'>
          {this.props.name}</Heading>
        <Image src={this.props.profilePhoto} fit='contain' />
        <Paragraph>{this.props.description} </Paragraph>
        <Box direction='row'
          responsive={false}>
          <Button icon={<SocialGithubIcon />}
            href={this.props.githubUrl} />

          <Button icon={<SocialLinkedinIcon />}
            href={this.props.linkedinUrl} />
        </Box>
      </Box>
    )
  }
}

export default Profile
