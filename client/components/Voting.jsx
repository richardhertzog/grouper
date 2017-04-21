import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Paragraph from 'grommet/components/Paragraph'
import Button from 'grommet/components/Button'
import LikeIcon from 'grommet/components/icons/base/Like'
import DislikeIcon from 'grommet/components/icons/base/Dislike'

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
    let stringifiedVote = {'yelpApiId': id, 'vote': vote}
    if (localStorage.getItem('votes') === null) {
      let arr = []
      arr.push(stringifiedVote)
      localStorage.setItem('votes', JSON.stringify(arr))
    } else {
      let temp = JSON.parse(localStorage.getItem('votes'))
      temp.push(stringifiedVote)
      localStorage.setItem('votes', JSON.stringify(temp))
      this.createCategories()
    }
    this.setState((prevState, props) => ({
      index: prevState.index + 1
    }))
    if ((JSON.parse(localStorage.getItem('votes'))).length === this.props.yelpData.yelpApiContent.length) {
      this.sendVotesServer()
    }
    this.checkClientVotingStatus()
  }

  checkClientVotingStatus () {
    if (this.state.index === this.props.yelpData.yelpApiContent.length - 1) {
      this.setState({ isClientVoting: false })
    }
  }

  sendVotesServer () {
    let sendArr = JSON.parse(localStorage.getItem('votes'))
    axios.post('/api/groups/' + this.props.name + '/votes', {key: sendArr})
    .then((response) => {
      this.checkClientVotingStatus()
    }).catch((err) => {
      console.error('ErrorSendingVotes', err)
    })
  }

  createCategories () {
    let catogs = []
    let temp = this.props.yelpData.yelpApiContent[this.state.index].categories
    for (var i = 0; i < 3; i++) {
      if (temp[i] === undefined) {
        catogs.push(<div key={Math.random()} />)
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
      <Article
        pad={{}}
        margin={{
          'left': 'large',
          'right': 'large',
          'top': 'small',
          'bottom': 'small'}}>
        <Section
          pad='small'
          justify='center'
          align='center'
          margin={{
            'left': 'large',
            'right': 'large',
            'top': 'small',
            'bottom': 'none'}}>
          <h3>
            {this.props.name}
          </h3>
        </Section>
        <Section
          pad='small'
          justify='center'
          margin={{
            'left': 'large',
            'right': 'large',
            'top': 'small',
            'bottom': 'small'}}>
          <Image
            src={this.props.yelpData.yelpApiContent[this.state.index].image_url}
            full='horizontal'
            size='small'
           />
        </Section>
        <Section
          pad='small'
          justify='center'
          align='center'
          margin={{
            'top': 'small',
            'bottom': 'small'}}>
          <h2>
            {this.props.yelpData.yelpApiContent[this.state.index].name}
          </h2>
        </Section>
        <Section
          margin={{
            'top': 'none',
            'bottom': 'none'}}
          justify='center'
          align='center'
          textAlign='center'>
          <Paragraph size='small'
            margin='small'>
            {this.props.yelpData.yelpApiContent[this.state.index].price}
            <h4>
              {this.state.categories.map((cats) => {
                return cats
              })}
            </h4>
          </Paragraph>
        </Section>
        <Section>
          <Box justify='between'
            align='center'
            responsive={false}
            direction='row'
            pad={{'between': 'small'}}
            margin={{
              'left': 'large',
              'right': 'large',
              'top': 'small',
              'bottom': 'large'}}>
            <Button
              icon={<DislikeIcon size='large' />}
              type='submit'
              secondary
              id={this.pro}
              onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(0, this.props.yelpData.yelpApiContent[this.state.index].id) }} />
            <Button
              icon={<LikeIcon size='large' />}
              type='submit'
              secondary
              onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(1, this.props.yelpData.yelpApiContent[this.state.index].id) }} />
          </Box>
        </Section>
      </Article>
    )
  }
}

export default Voting
