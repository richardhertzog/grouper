import React, { Component, PropTypes } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import CopyToClipboard from 'react-copy-to-clipboard'



class Waiting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winnerReady: false,
      notReady: false
    }
    this.populateState = this.populateState.bind(this)
  }

  populateState () {
    axios.get('/api/groups/' + this.props.name)
    .then((res) => {
      if(res.data.winner){
        this.setState({winnerReady: !this.state.winnerReady})
      } else {
        this.setState({notReady: true})
      }
    })
  }

  render () {
    if (this.state.winnerReady) {
     return <Redirect to={`/voting/winner`} />
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
          <div onClick={this.populateState}>Quick Route</div>
        </div>
      )
    }
    return (
      <div>
        <div>
          <CopyToClipboard text={this.props.link}
            onCopy={() => this.setState({copied: true})}>
            <button>{this.props.name}</button>
          </CopyToClipboard>

          {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        </div>
        <p>Waiting.jsx Waiting for other users etc ......</p>
        {this.props.name}
        <div onClick={this.populateState}>Quick Route</div>
      </div>
    )
  }
}

Waiting.propTypes = {

}

export default Waiting
