import React, { Component } from 'react'
import PubNub from 'pubnub'
import config from '../config'

class Chat extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      messages: [],
      groupName: localStorage.getItem('groupName')
    }

    this.pubnub = new PubNub({
      subscribeKey: config.subscribeKey,
      publishKey: config.publishKey,
      ssl: true,
      uuid: String(Math.random() * 1000)
    })

    this.pubnub.subscribe({
      channels: [this.state.groupName],
      withPresence: true // TODO: use this to display people typing
    })

    this.pubnub.addListener({
      message: (e) => {
        this.setState({
          messages: [...this.state.messages, {text: e.message.text, user: this.pubnub.getUUID()}]
        })
      }
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage () {
    this.pubnub.publish({
      channel: [this.state.groupName],
      message: {
        user: this.state.user,
        text: this.state.text
      }
    })
  }

  handleChange (event) {
    let { name, value } = event.target
    let newState = {}
    newState[name] = value
    this.setState(newState)
  }

  handleSubmit (event) {
    event.preventDefault()
    this.sendMessage()
    this.setState({text: ''})
  }

  messages () {
    return (<ul>{this.state.messages.map((message, idx) => { return <li key={idx}>{message.user}: {message.text}</li> })}</ul>)
  }

  render () {
    return (
      <div>
        {this.messages()}
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>text: </label>
            <input name='text' type='text' value={this.state.text} onChange={this.handleChange} required />
          </fieldset>
          <button action='submit'>Send!</button>
        </form>
      </div>)
  }
}

export default Chat
