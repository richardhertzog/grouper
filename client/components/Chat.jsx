import React, { Component } from 'react'
import PubNub from 'pubnub'

class Chat extends Component {
  constructor () {
    super()
    this.state = {
      text: '',
      messages: []
    }

    this.pubnub = new PubNub({
      subscribeKey: process.env.SUBSCRIBE_KEY,
      publishKey: process.env.PUBLISH_KEY,
      ssl: true
    })

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.subscribe()
  }

  subscribe () {
    this.pubnub.subscribe({
      channels: ['my_channel'],
      withPresence: true // also subscribe to presence instances.
    })
  }

  publish () {
    this.pubnub.addListener({
      status: function (statusEvent) {
        if (statusEvent.category === 'PNConnectedCategory') {
          var payload = {
            my: 'payload'
          }
          this.pubnub.publish(
            {
              message: payload
            },
                function (status) {
                    // handle publish response
                }
            )
        }
      },
      message: function (message) {
        // handle message
      },
      presence: function (presenceEvent) {
        // handle presence
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
    let messages = this.state.messages
    messages.push(this.state.text)
    this.setState({messages: messages, text: ''})
  }

  messages () {
    return (<ul>{this.state.messages.map((message) => { return <li key={message}>{message}</li> })}</ul>)
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
