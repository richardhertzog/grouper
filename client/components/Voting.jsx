import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'
import axios from 'axios'
import Card from 'grommet/components/Card'
import Image from 'grommet/components/Image'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'
import Paragraph from 'grommet/components/Paragraph'
import Button from 'grommet/components/Button'
import CheckmarkIcon from 'grommet/components/icons/base/Checkmark'
import CloseIcon from 'grommet/components/icons/base/Close'

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
      <Article>
        <Section
          pad='large'
          justify='center'
          align='center'>
          <Headline margin='none'>
            {this.props.name}
          </Headline>
        </Section>
        <Section>
          <Image
            src={this.props.yelpData.yelpApiContent[this.state.index].image_url}
            fit='cover'
            full
            size='small'
           />
        </Section>
        <Section>
          {this.props.yelpData.yelpApiContent[this.state.index].name}
        </Section>
        <Section>
          <Paragraph size='medium'>
            {this.props.yelpData.yelpApiContent[this.state.index].price}
            <div>
              {this.state.categories.map((cats) => {
                return cats
              })}
            </div>
          </Paragraph>
        </Section>
        <Section>
          <Box justify='start'
              align='center'
              wrap
              direction='row'
              pad='medium'
              margin='small'>
              <Button 
                icon={<CheckmarkIcon />}
                type='submit'
                secondary
                onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(1, this.props.yelpData.yelpApiContent[this.state.index].id) }} />
              <Button 
                icon={<CloseIcon />}
                type='submit'
                secondary
                id={this.pro}
                onClick={(event) => { event.preventDefault(); this.nextBusinessStateChange(1, this.props.yelpData.yelpApiContent[this.state.index].id) }} />
            </Box>
        </Section>
        {/* // heading=
        // description={this.props.yelpData.yelpApiContent[this.state.index].price}
        // flex> */}
      </Article>
    )
  }
}

export default Voting
