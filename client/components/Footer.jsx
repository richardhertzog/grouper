import React, { Component } from 'react'
import GrommetFooter from 'grommet/components/Footer'
import Box from 'grommet/components/Box'
import Paragraph from 'grommet/components/Paragraph'
import Anchor from 'grommet/components/Anchor'
import Menu from 'grommet/components/Menu'
import Title from 'grommet/components/Title'
import Label from 'grommet/components/Label'

class Footer extends Component {
  render () {
    return (
      <GrommetFooter justify='between'
        margin='none'
        pad='none'
        size='xsmall'>
        <Box flex={true}
          align='start'
          justify='start'
          margin='medium'
          pad='small'
          responsive={true}>
          <Anchor
            path='/'
            size='medium'
            label={<Label>{<Title>Grüper</Title>}</Label>}/>
        </Box>
        <Box direction='row'
          align='center'
          pad={{"between": "medium"}}>
          <Paragraph margin='none'>
            2016 Grommet Labs
          </Paragraph>
          <Menu direction='row'
            size='small'
            dropAlign={{"right": "right"}}>
            <Anchor href='#'>
              Support
            </Anchor>
            <Anchor href='#'>
              Contact
            </Anchor>
            <Anchor href='#'>
              About
            </Anchor>
          </Menu>
        </Box>
      </GrommetFooter>
    )
  }
}

export default Footer