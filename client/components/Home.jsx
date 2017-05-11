import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Headline from 'grommet/components/Headline'
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image'
import Heading from 'grommet/components/Heading'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Article colorIndex='light-2'>
          <Section pad='small'
            justify='center'>
            <Headline margin='none'>
              <Hero background={<Image src='img/hero.jpg'
                fit='cover'
                full />}
                backgroundColorIndex='dark' />
            </Headline>
          </Section>
        </Article>
        <Box
          align='start'
          pad='small'
          colorIndex='light-2'>
          <Heading
            tag='h3'>
            Start Eating Now
          </Heading>
          <Button href='/#/makeGroup'
            primary
            label='Create Group' />
        </Box>
        <Box
          basis='full'
          align='end'
          pad='small'
          colorIndex='light-2'>
          <Heading
            tag='h3'>
            Sign Up Now!
          </Heading>
          <Button href='/#/signup'
            primary
            label='Join Us!' />
        </Box>
        <Box
          basis='full'
          align='start'
          pad='small'
          colorIndex='light-2'>
          <Heading
            tag='h3'>
            Meet Our Team!
          </Heading>
          <Button href='/#/about'
            primary
            label='Learn More!' />
        </Box>
      </div>
    )
  }
}

export default Home
