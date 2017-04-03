import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

class Voting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      curBusiness: {},
      businesses: [],
      vote: 0,
      yelpApiId: '',
      name: ''
    }
    this.populateState = this.populateState.bind(this)
    this.yesButton = this.yesButton.bind(this)
    this.noButton = this.noButton.bind(this)
    this.sendVotesServer = this.sendVotesServer.bind(this)
    this.populateState()
  }

  populateState () {
    let name = this.props.location.pathname.slice(8)
    this.setState({ name: name })
    axios.get('/api/groups/' + name)
    .then((res) => {
      console.log(res)
      let result = res.data.yelpApiContent
      let current = result.shift()
      this.setState({curBusiness: current})
      this.setState({businesses: result})
      this.setState({yelpApiId: current.id})
    })
  }

  yesButton (event) {
    event.preventDefault()
    this.setState({vote: event.target.value})
    this.nextBusinessStateChange(event.target.value)
  }

  noButton (event) {
    event.preventDefault()
    this.setState({vote: -1})
    this.nextBusinessStateChange()
  }

  nextBusinessStateChange (vote) {
    let biz = this.state.businesses.shift()
    this.setState({curBusiness: biz})
    this.setState({yelpApiId: this.state.curBusiness.id})
    this.sendVotesServer(vote)
  }

  sendVotesServer (vote) {
    axios.post('/api/groups/' + this.props.location.pathname.slice(8) + '/votes', {
      yelpApiId: this.state.yelpApiId,
      vote: vote
    })
    .then((response) => {
      console.log(response)
    })
  }

  render () {
    return (
      <div>
        <div className='card' style={{'width': '400'}}>
          <img className='card-img-top img-thumbnail' src={this.state.curBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.curBusiness.name}</h4>
            <p className='card-text'>{this.state.curBusiness.price}</p>
            {/* <a href="#" className="btn btn-primary mr-2" onClick={this.yesButton}>YES</a>
            <a href="#" className="btn btn-primary mr-2">NO</a> */}
          </div>
        </div>
        <button value={1} onClick={this.yesButton}>Yes</button>
        <button value={-1} onClick={this.noButton}>No</button>
      </div>
    )
  }
}

export default Voting
