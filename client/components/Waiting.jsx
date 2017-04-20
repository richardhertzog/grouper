import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import CopyToClipboard from 'react-copy-to-clipboard'
import ReactCountdownClock from 'react-countdown-clock'
import Chat from './Chat.jsx'
import Timer from './Timer.jsx'

import Box from 'grommet/components/Box'
import Section from 'grommet/components/Section'

class Waiting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winnerReady: false,
      notReady: false
    }
    this.populateState = this.populateState.bind(this)
    this.checkTime = this.checkTime.bind(this)
    this.checkTime()
  }

  checkTime () {
    if (this.props.endTime < Date.now()) {
      this.populateState()
    } else {
      setTimeout(this.checkTime, this.props.endTime - Date.now() + 1000)
    }
  }

  populateState () {
    axios.get('/api/groups/' + this.props.name)
    .then((res) => {
      if (res.data.winner) {
        this.setState({winnerReady: !this.state.winnerReady})
      } else {
        this.setState({notReady: true})
      }
    })
  }

  render () {
    if (this.state.winnerReady) {
      return <Redirect to={`/voting/winner/` + this.props.name} />
    } else if (this.state.notReady) {
      return (
        <div>
          <div>{this.props.link}</div>
          <div>
            <CopyToClipboard text={this.props.link}
              onCopy={() => this.setState({copied: true})}>
              <button>{this.props.name}</button>
            </CopyToClipboard>

            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </div>
          <div>Not Ready Yet!</div>
          <p>Waiting.jsx Waiting for other users etc ......</p>
        </div>
      )
    }
    return (
      <div>
        <Section>
          <Box 
            direction='row'
            align='center'
            textAlign='left'
            margin='small'>
            <Section>
              <CopyToClipboard text={this.props.link}
                onCopy={() => this.setState({copied: true})}>
                <button>{this.props.name}</button>
              </CopyToClipboard>
              {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
            </Section>
            <Section>
              {/*<ReactCountdownClock seconds={(this.props.endTime - Date.now() + 1000) / 1000}
                color='#000'
                alpha={0.9}
                size={100}
                onComplete={this.populateState} />*/}
                <Timer time={(this.props.endTime - Date.now() + 1000) / 1000}/>
            </Section>
          </Box>
        </Section>
        {/*<p>Waiting.jsx Waiting for other users etc ......</p>
        {this.props.name}*/}
        <Section pad='small'
          margin={{
            'left': 'none',
            'right': 'none',
            'top': 'small',
            'bottom': 'small'}}>
          <Chat />
        </Section>
      </div>
    )
  }
}

export default Waiting
