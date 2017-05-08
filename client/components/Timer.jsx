import React, { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: Math.ceil(this.props.time)
    }
    this.tick = this.tick.bind(this)
    this.bs = this.bs.bind(this)
    this.bs()
  }

  tick() {
    this.setState({time: this.state.time - 1})
  }

  bs() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return(
      <div>Time Left: {Math.floor((this.state.time / 60))} minutes and {this.state.time % 60} seconds</div>
    )
  }
}

export default Timer