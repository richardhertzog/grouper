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
import RadioButton from 'grommet/components/RadioButton'
import NumberInput from 'grommet/components/NumberInput'
import Box from 'grommet/components/Box'
import CafeteriaIcon from 'grommet/components/icons/base/Cafeteria'
import BarIcon from 'grommet/components/icons/base/Bar'

class MakeGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      businessType: null,
      location: '',
      endTime: 1,
      renderVote: false
      // restaurant: false,
      // bar: false
    }

    // this.selectType = this.selectType.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.businessClick = this.businessClick.bind(this)
    this.changeTime = this.changeTime.bind(this)
  }

  handleSubmit (event) {
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

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  businessClick (event) {
    this.setState({ businessType: event.target.name })
    console.log(this.state)
  }

  changeTime (event) {
    let time = event.target.value
    this.setState({endTime: time})
  }

  render () {
    if (this.state.renderVote) {
      return (<Redirect to={`/voting/group/${this.state.groupName}`} />)
    }

    return (
      <Box
        align='center'
        pad='medium'
        margin='small'>
        <Form>
          <Header>
            <Heading>
            Create A Group
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
          <Button icon={<BarIcon />}
            name='bar'
            label='Drinks'
            onClick={this.businessClick} />
          <Button icon={<CafeteriaIcon />}
            name='restaurant'
            label='Food'
            onClick={this.businessClick} />
          <NumberInput defaultValue={1}
            step={1}
            min={1}
            onChange={this.changeTime} />
          <Footer pad={{'vertical': 'medium'}}>
            <Box justify='start'
              align='center'
              wrap
              pad='medium'
              margin='small'>
              <Button label='Submit'
                type='submit'
                primary
                onClick={this.handleSubmit} />
            </Box>
          </Footer>
        </Form>
      </Box>
    )
  }
}

export default MakeGroup
