import React, { Component, PropTypes } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'



class Waiting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winnerReady: false,
      notReady: false
    }
    // this.quickChange = this.quickChange.bind(this)
    this.populateState = this.populateState.bind(this)
  }

  populateState () {
    console.log('popState called')
    axios.get('/api/groups/' + this.props.name)
    .then((res) => {
      console.log(res, 'res object popState')
      if(res.data.winner){
        console.log('seting state of winner')
        this.setState({winnerReady: !this.state.winnerReady})
      } else {
        console.log('setting state of not ready')
        this.setState({notReady: true})
      }
    })
  }

  // quickChange() {
  //   this.setState({winnerReady: !this.state.winnerReady})
  // }

  render () {
    if (this.state.winnerReady) {
     return <Redirect to={`/voting/winner`} />
    } else if (this.state.notReady) {
      return (
        <div>
          <div>Not Ready Yet!</div>
          <p>Waiting.jsx Waiting for other users etc ......</p>
          <div onClick={this.populateState}>Quick Route</div>
        </div>
      )
    }
    return (
      <div>
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
