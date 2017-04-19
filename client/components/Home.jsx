import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav.jsx'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Headline from 'grommet/components/Headline'
import Hero from 'grommet/components/Hero'
import Card from 'grommet/components/Card'
import Anchor from 'grommet/components/Anchor'
import Image from 'grommet/components/Image'
import Columns from 'grommet/components/Columns'

class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Box direction='row'
        align='center'
        wrap
        pad='small'
        margin='small'>
        <Article colorIndex='light-2'>

          <Section pad='small'
            justify='center'
            align='stretch'>
            <Headline margin='none'>
              <Hero background={<Image src='img/hero.jpg'
                fit='cover'
                full />}
                backgroundColorIndex='dark'
                 />
            </Headline>

          </Section>

          <Section
            pad='small'
            justify='center'
            align='stretch'>
            <Box
              basis='full'
              align='start'
              pad='small'
              colorIndex='light-2'>
              <Card
                description='Find your next meal with Grüper!'
                label='Start Eating Now!'
                link={<Anchor path='/makeGroup'
                  primary
                  label='Create Group' />}
              />
            </Box>
          </Section>

          <Section pad='small'
            justify='center'
            align='stretch'>
            <Box
              basis='full'
              align='end'
              pad='small'
              colorIndex='light-2'>
              <Card
                description='Create an account for more amazing experiences!'
                label='SignUp Now!'
                link={<Anchor path='/signup'
                  primary
                  label='Join Us!' />}
              />
            </Box>
          </Section>

          <Section pad='small'
            justify='center'
            align='stretch'>
            <Box
              basis='full'
              align='start'
              pad='small'
              colorIndex='light-2'>
              <Card
                description="Meet Grüper's Amazing team!"
                label='About Us'
                link={<Anchor path='#'
                  primary
                  label='Learn More!' />}
              />
            </Box>
          </Section>

        </Article>
      </Box>
    )
  }
}

export default Home
