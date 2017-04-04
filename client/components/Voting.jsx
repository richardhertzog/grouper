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
      name: '',
      winBusiness: {},
      voting: true
    }
    this.populateState = this.populateState.bind(this)
    this.yesButton = this.yesButton.bind(this)
    this.noButton = this.noButton.bind(this)
    this.sendVotesServer = this.sendVotesServer.bind(this)
    this.sendWinner = this.sendWinner.bind(this)
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

  yesButton (num) {
    event.preventDefault()
    this.setState({vote: num})
    this.nextBusinessStateChange(num)
  }

  noButton (num) {
    event.preventDefault()
    this.setState({vote: num})
    this.nextBusinessStateChange(num)
  }

  nextBusinessStateChange (vote) {
    let biz = this.state.businesses.shift()
    this.setState({curBusiness: biz})
    this.setState({yelpApiId: this.state.curBusiness.id})
    this.sendWinner()
    this.sendVotesServer(vote)
  }

  sendWinner() {
    if (this.state.businesses.length === 1) {
      this.setState({voting: false})
      axios.get('/api/groups/' + this.props.location.pathname.slice(8))
      .then((res) => {
        console.log(res);
        console.log(res.data.winner);
        res.data.yelpApiContent.filter((biz) => {
          if (biz.id === res.data.winner) {
            this.setState({winBusiness: biz})
          }
        })
        .then(() => console.log('hey'))
      })
    }
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
    if (!this.state.voting) {
      return (
        <div className='card' style={{'width': '400'}}>
          WINNER
          <img className='card-img-top img-thumbnail' src={this.state.winBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.winBusiness.name}</h4>
            <p className='card-text'>{this.state.winBusiness.price}</p>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='card' style={{'width': '400'}}>
          <img className='card-img-top img-thumbnail' src={this.state.curBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.curBusiness.name}</h4>
            <p className='card-text'>{this.state.curBusiness.price}</p>
             <a href="#" value={1} className="btn btn-primary mr-2" onClick={(event) => {event.preventDefault(); this.yesButton(1)}}>YES</a>
            <a href="#" value={0} className="btn btn-primary mr-2" onClick={(event) => {event.preventDefault(); this.noButton(0)}}>NO</a> 
          </div>
        </div>
        {/*<button value={1} onClick={this.yesButton}>Yes</button>
        <button value={0} onClick={this.noButton}>No</button>*/}
      </div>
    )
  }
}

export default Voting
