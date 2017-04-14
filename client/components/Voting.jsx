import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios'

class Voting extends Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false,
      isClientVoting: true,
      index: 0,
      categories: []
    }
    this.sendVotesServer = this.sendVotesServer.bind(this)
    this.checkClientVotingStatus = this.checkClientVotingStatus.bind(this)
    this.createCategories = this.createCategories.bind(this)
  }

  nextBusinessStateChange (vote, id) {
    this.setState((prevState, props) => ({
      index: prevState.index + 1
    }))
    this.sendVotesServer(vote, id)
    this.checkClientVotingStatus()
  }

  checkClientVotingStatus () {
    if (this.state.index === this.props.yelpData.yelpApiContent.length - 1) {
      this.setState({ isClientVoting: false })
    }
  }

  sendVotesServer (vote, id) {
    axios.post('/api/groups/' + this.props.name + '/votes', {
      yelpApiId: id,
      vote: vote
    })
    .then((response) => {
      this.checkClientVotingStatus()
      this.createCategories()
    })
  }

  createCategories () {
    let catogs = []
    let temp = this.props.yelpData.yelpApiContent[this.state.index].categories
    for (var i = 0; i < 3; i++) {
      if (temp[i] === undefined) {
        catogs.push(<div key={Math.random()}>Gibberish</div>)
      } else {
        let line = <div key={temp[i].title}>{temp[i].title}</div>
        catogs.push(line)
      }
    }
    this.setState({categories: catogs})
  }
  componentDidMount () {
    this.createCategories()
  }

  render () {
    if (!this.state.isClientVoting) {
      localStorage.setItem('voted', true)
      return (<Redirect to={`/voting/waiting/` + this.props.name} />)
    }
    return (
      <div>
        <div>
          <CopyToClipboard text={window.location.href.slice(0,31) + 'welcome'}
            onCopy={() => this.setState({copied: true})}>
            <button>{this.props.name}</button>
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
              {this.state.categories.map((cats) => {
                return cats
              })}
            </div>
            <a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle' onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(1, this.props.yelpData.yelpApiContent[this.state.index].id) }}>YES</a>
            <a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle' onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(0, this.props.yelpData.yelpApiContent[this.state.index].id) }}>NO</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Voting
