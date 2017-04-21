import React, { Component } from 'react'

// grommet components
import Article from 'grommet/components/Article'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'
import Card from 'grommet/components/Card'
import Box from 'grommet/components/Box'
import Anchor from 'grommet/components/Anchor'
import Image from 'grommet/components/Image'
import SocialLinkedinIcon from 'grommet/components/icons/base/SocialLinkedin'
import SocialGithubIcon from 'grommet/components/icons/base/SocialGithub'
import Button from 'grommet/components/Button'

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
        <Card label={this.props.name}
          thumbnail={<Image src={this.props.profilePhoto} fit='cover' full />}
          description={this.props.description} />
        <Box direction='row'
          wrap>
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
