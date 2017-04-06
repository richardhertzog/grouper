import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
      copied: false,
      isClientVoting: true
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
      this.setState({ isClientVoting: false })
      // axios.get('/api/groups/' + this.props.location.pathname.slice(8))
      // .then((res) => {
      //   console.log(res, 'res 70 Voting')
      //   res.data.yelpApiContent.filter((biz) => {
      //     if (biz.id === res.data.winner) {
      //       this.setState({winBusiness: biz})
      //     }
      //   })
      // })
      // .then(() => console.log('hey'))
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
        <div className='card' style={{'width': '400px'}}>
          <img className='card-img-top img-thumbnail' src={this.state.winBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.winBusiness.name}</h4>
            <p className='card-text'>{this.state.winBusiness.price}</p>
          </div>
        </div>
      )
    }
    if (!this.state.isClientVoting) {
      return (<Redirect to={`/waiting`} components={this.state.winner} />)
    }
    return (
      <div>
        <div>
          <CopyToClipboard text={window.location.href}
            onCopy={() => this.setState({copied: true})}>
            <button>{this.props.location.pathname}</button>
          </CopyToClipboard>

          {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        </div>
        <div className='card text-center' style={{'width': '400px'}}>
          <h3 className='card-header'>{this.props.location.pathname.slice(8)}</h3>
          <img className='card-img-top img-thumbnail' src={this.state.curBusiness.image_url} alt='Business Image' style={{'width': '400px', 'height': '400px', 'hidden': 'scroll'}} />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.curBusiness.name}</h4>
            <p className='card-text'>{this.state.curBusiness.price}</p>
            <span className='octicon-x' aria-hidden='true' />
            <p className='card-text'>{this.state.curBusiness.display_phone}</p>
            {/* <p className='card-text'>{this.state.curBusiness</p> */}
            {/* <p>{this.state.curBusiness.categories.map((obj) => {return <p className='card-text'>{obj}</p>})}</p> */}
            <a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle' onClick={(event) => { event.preventDefault(); this.yesButton(1, this.state.curBusiness.id) }}>YES</a>
            <a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle ' onClick={(event) => { event.preventDefault(); this.noButton(0, this.state.curBusiness.id) }}>NO</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
