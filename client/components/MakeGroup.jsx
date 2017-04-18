import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'
import Header from 'grommet/components/Header'
import Heading from 'grommet/components/Heading'
import Footer from 'grommet/components/Footer'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button'
import Box from 'grommet/components/Box'
import CafeteriaIcon from 'grommet/components/icons/base/Cafeteria'
import BarIcon from 'grommet/components/icons/base/Bar'
import AddCircleIcon from 'grommet/components/icons/base/AddCircle'
import SubtractCircleIcon from 'grommet/components/icons/base/SubtractCircle'
import Toast from 'grommet/components/Toast'
import Label from 'grommet/components/Label'

class MakeGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      businessType: null,
      location: '',
      endTime: 1,
      renderVote: false,
      toast: false,
      barSelected: false,
      restaurantSelected: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.barClick = this.barClick.bind(this)
    this.restaurantClick = this.restaurantClick.bind(this)
    this.addTime = this.addTime.bind(this)
    this.reduceTime = this.reduceTime.bind(this)
  }

  handleSubmit (event) {
    if (this.state.groupName.includes(' ')) {
      this.setState({toast: true})
    } else {
      event.preventDefault()
      let time = this.state.endTime
      time = time * 60 * 1000 + Date.now()
      axios.post('/api/groups',
        { groupName: this.state.groupName,
          location: this.state.location,
          eventType: this.state.businessType,
          endTime: time
        })
    .then(() => {
      this.setState({ renderVote: true })
    })
    .catch((err) => {
      console.error(err)
    })
    }
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  barClick (event) {
    event.preventDefault()
    this.setState({
      businessType: 'bar',
      barSelected: true,
      restaurantSelected: false
    })
  }
  restaurantClick (event) {
    event.preventDefault()
    this.setState({
      businessType: 'restaurant',
      barSelected: false,
      restaurantSelected: true
    })
  }

  addTime (event) {
    this.setState({endTime: this.state.endTime + 1})
  }

  reduceTime (event) {
    this.state.endTime > 1 ? this.setState({endTime: this.state.endTime - 1}) : console.log('poop')
  }

  spaceWarning () {
    return (
      <Toast status='ok'
        status='warning'>
        A group name cannot contain spaces.
      </Toast>
    )
  }

  render () {
    if (this.state.renderVote) {
      return (<Redirect to={`/voting/group/${this.state.groupName}`} />)
    }

    return (
      <div>
        {this.state.toast && this.spaceWarning()}
        <Box
          align='center'
          textAlign='center'
          pad={{'vertical': 'large',
            'horizontal': 'small'}}
          margin='medium'>
          <Form>
            <Header>
              <Heading
                align='center'
                margin='small'>
            Create Group
          </Heading>
            </Header>
            <FormField>
              <TextInput
                name='groupName'
                placeHolder='Super Awesome Group Name'
                onDOMChange={this.handleChange} />
            </FormField>
            <FormField>
              <TextInput
                name='location'
                placeHolder='Nob Hill, San Francisco, CA'
                onDOMChange={this.handleChange} />
            </FormField>
            <Box
              justify='between'
              direction='row'
              pad={{'between': 'small',
                'vertical': 'small'}}
              margin='small'
              wrap>
              <Button label='Drinks'
                icon={<BarIcon />}
                name='bar'
                type='submit'
                primary={this.state.barSelected}
                onClick={this.barClick} />
              <Button icon={<CafeteriaIcon />}
                name='restaurant'
                type='submit'
                label='Food'
                primary={this.state.restaurantSelected}
                onClick={this.restaurantClick} />
            </Box>
            <Label
              size='large'
              align='center'>
              Set Timer
            </Label>
            <Box direction='row'
              align='start'
              justify='between'
              basis='large'
              wrap={false}>
              <Button icon={<SubtractCircleIcon size='large' />}
                onClick={this.reduceTime} />
              <h1>{this.state.endTime} min</h1>
              <Button icon={<AddCircleIcon size='large' />}
                onClick={this.addTime} />
            </Box>
            <Footer pad={{'vertical': 'medium',
              'between': 'medium'}}>
              <Button label='Submit'
                primary
                fill
                onClick={this.handleSubmit} />
            </Footer>
          </Form>
        </Box>
      </div>
    )
  }
}

export default MakeGroup
