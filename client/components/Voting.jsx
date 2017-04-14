import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios'
import Card from 'grommet/components/Card'
import Image from 'grommet/components/Image'

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
      <Card
        thumbnail='https://s3-media3.fl.yelpcdn.com/bphoto/uweSiOf0XBB4BPk_ibHVyg/o.jpg'
        heading={this.props.yelpData.yelpApiContent[this.state.index].name}
        description={this.props.yelpData.yelpApiContent[this.state.index].price}
        flex
        reverse={false} />
    )
  }
}

export default Voting
