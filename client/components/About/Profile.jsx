import React, { Component } from 'react'

// grommet components
import Article from 'grommet/components/Article'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'

class Profile extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Section pad='large'
        justify='center'
        align='center'
        colorIndex='grey-4'>
        <Headline margin='none'>
            {this.props.name}
        </Headline>
      </Section>
    )
  }
}

export default Profile
