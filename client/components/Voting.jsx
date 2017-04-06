import React, { Component } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
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
      voting: true,
      copied: false
    }
    this.populateState = this.populateState.bind(this)
    this.yesButton = this.yesButton.bind(this)
    this.noButton = this.noButton.bind(this)
    this.sendVotesServer = this.sendVotesServer.bind(this)
    this.sendWinner = this.sendWinner.bind(this)
    this.populateState()
  }

  populateState () {
    axios.get('/api/groups/' + this.props.location.pathname.slice(8))
    .then((res) => {
      if (!res.data.isVoting) {
        this.setState({voting: false})
        res.data.yelpApiContent.filter((biz) => {
          if (biz.id === res.data.winner) {
            this.setState({winBusiness: biz})
          }
        })
      }
      let result = res.data.yelpApiContent
      let current = result.pop()
      this.setState({
        curBusiness: current,
        businesses: result,
        yelpApiId: current.id
      })
    })
  }

  yesButton (num, id) {
    event.preventDefault()
    this.nextBusinessStateChange(num, id)
  }

  noButton (num, id) {
    event.preventDefault()
    this.nextBusinessStateChange(num, id)
  }

  nextBusinessStateChange (vote, id) {
    let biz = this.state.businesses.pop()
    this.setState({
      curBusiness: biz,
      yelpApiId: biz.id})
    this.sendVotesServer(vote, id)
    // this works sometimes. Needs refactoring
    this.sendWinner()
  }

  sendWinner () {
    if (this.state.businesses.length === 0) {
      this.setState({voting: false})
      axios.get('/api/groups/' + this.props.location.pathname.slice(8))
      .then((res) => {
        res.data.yelpApiContent.filter((biz) => {
          if (biz.id === res.data.winner) {
            this.setState({winBusiness: biz})
          }
        })
      })
      .then(() => console.log('hey'))
    }
  }

  sendVotesServer (vote, id) {
    axios.post('/api/groups/' + this.props.location.pathname.slice(8) + '/votes', {
      yelpApiId: id,
      vote: vote
    })
    .then((response) => {
      this.sendWinner()
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
        <div>
          <CopyToClipboard text={this.props.location.pathname}
            onCopy={() => this.setState({copied: true})}>
            <button>{this.props.location.pathname.slice(8)}</button>
          </CopyToClipboard>

          {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        </div>
        <div className='card' style={{'width': '400'}}>
          <img className='card-img-top img-thumbnail' src={this.state.curBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.curBusiness.name}</h4>
            <p className='card-text'>{this.state.curBusiness.price}</p>
            <a href='#' className='btn btn-primary mr-2' onClick={(event) => { event.preventDefault(); this.yesButton(1, this.state.curBusiness.id) }}>YES</a>
            <a href='#' className='btn btn-primary mr-2' onClick={(event) => { event.preventDefault(); this.noButton(0, this.state.curBusiness.id) }}>NO</a>
          </div>
        </div>
        {/* <button value={1} onClick={this.yesButton}>Yes</button>
        <button value={0} onClick={this.noButton}>No</button> */}
      </div>
    )
  }
}

export default Voting
