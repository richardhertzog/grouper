import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios'

class Voting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // curBusiness: {},
      // businesses: [],
      // vote: 0,
      // yelpApiId: '',
      // name: '',
      // winBusiness: {},
      // voting: true,
      copied: false,
      isClientVoting: true,
      index: 0
    }
    // this.populateState = this.populateState.bind(this)
    // this.yesButton = this.yesButton.bind(this)
    // this.noButton = this.noButton.bind(this)
    this.sendVotesServer = this.sendVotesServer.bind(this)
    this.checkClientVotingStatus = this.checkClientVotingStatus.bind(this)
    // this.populateState()
  }

  // populateState () {
  //   axios.get('/api/groups/' + this.props.groupName)
  //   .then((res) => {
  //     if (!res.data.isVoting) {
  //       this.setState({voting: false})
  //       res.data.yelpApiContent.filter((biz) => {
  //         if (biz.id === res.data.winner) {
  //           this.setState({winBusiness: biz})
  //         }
  //       })
  //     }
  //     let result = res.data.yelpApiContent
  //     let current = result.pop()
  //     this.setState({
  //       curBusiness: current,
  //       businesses: result,
  //       yelpApiId: current.id
  //     })
  //   })
  // }

  // yesButton (num, id) {
  //   event.preventDefault()
  //   this.nextBusinessStateChange(num, id)
  // }

  // noButton (num, id) {
  //   event.preventDefault()
  //   this.nextBusinessStateChange(num, id)
  // }

  nextBusinessStateChange (vote, id) {
    this.setState((prevState, props) => ({
      index: prevState.index + 1
    }))
    // let biz = this.state.businesses.pop()
    // this.setState({
    //   curBusiness: biz,
    //   yelpApiId: biz.id})
    this.sendVotesServer(vote, id)
    // this works sometimes. Needs refactoring
    this.checkClientVotingStatus()
  }

  checkClientVotingStatus () {
    if (this.state.index === this.props.yelpData.yelpApiContent.length - 1) {
      this.setState({ isClientVoting: false })
    }
  }

  sendVotesServer (vote, id) {
    axios.post('/api/groups/' + this.props.groupName + '/votes', {
      yelpApiId: id,
      vote: vote
    })
    .then((response) => {
      this.checkClientVotingStatus()
    })
  }

  render () {
    if (!this.state.isClientVoting) {
      return (<Redirect to={`/voting/waiting`} />)
    }
    return (
      <div>
        <div>
          <CopyToClipboard text={window.location.href}
            onCopy={() => this.setState({copied: true})}>
            <button>{this.props.groupName}</button>
          </CopyToClipboard>

          {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        </div>
        <div className='card text-center' style={{'width': '400px'}}>
          <h3 className='card-header'>{this.props.groupName}</h3>
          <img className='card-img-top img-thumbnail' src={this.props.yelpData.yelpApiContent[this.state.index].image_url} alt='Business Image' style={{'width': '400px', 'height': '400px', 'hidden': 'scroll'}} />
          <div className='card-block'>
            <h4 className='card-title'>{this.props.yelpData.yelpApiContent[this.state.index].name}</h4>
            <p className='card-text'>{this.props.yelpData.yelpApiContent[this.state.index].price}</p>
            <div>
              {this.props.yelpData.yelpApiContent[this.state.index].categories ? this.props.yelpData.yelpApiContent[this.state.index].categories.map((catogs) => {
                return <div key={catogs.title}>{catogs.title}</div>
              }) : null}
            </div>
            {/*<span className='octicon-x' aria-hidden='true' />*/}
            {/*<p className='card-text'>{this.props.yelpData.yelpApiContent[this.state.index].display_phone ? this.props.yelpData.yelpApiContent[this.state.index].display_phone : 'Number Not Available'}</p>*/}
            <a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle' onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(1, this.props.yelpData.yelpApiContent[this.state.index].id) }}>YES</a>
            <a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle' onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(0, this.props.yelpData.yelpApiContent[this.state.index].id) }}>NO</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
