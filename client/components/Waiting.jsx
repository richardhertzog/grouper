import React, { Component, PropTypes } from 'react'
import { Redirect } from 'react-router-dom'


class Waiting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winnerReady: false
    }
    this.quickChange = this.quickChange.bind(this)
  }

  quickChange() {
    this.setState({winnerReady: !this.state.winnerReady})
  }

  render () {
    if (this.state.winnerReady) {
     return <Redirect to={`/voting/winner`} />
    }
    return (
      <div>
        <p>Waiting.jsx Waiting for other users etc ......</p>
        {this.props.name}
        <div onClick={this.quickChange}>Quick Route</div>
      </div>
    )
  }
}

Waiting.propTypes = {

}

export default Waiting
