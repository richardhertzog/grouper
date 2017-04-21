import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Map from './Map.jsx'
import axios from 'axios'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Section from 'grommet/components/Section'
import Image from 'grommet/components/Image'
import Paragraph from 'grommet/components/Paragraph'
import Quote from 'grommet/components/Quote'

class Winner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winBusiness: {},
      isMapShowing: false
    }
    this.populateState = this.populateState.bind(this)
    this.toggleMap = this.toggleMap.bind(this)
  }

  componentWillMount () {
    this.populateState()
  }

  populateState () {
    axios.get('/api/groups/' + this.props.name)
    .then((res) => {
      res.data.yelpApiContent.filter((biz) => {
        if (biz.id === res.data.winner) {
          this.setState({winBusiness: biz})
        }
      })
    })
    .then(() => {
      if (localStorage.getItem('username')) {
        let username = localStorage.getItem('username')
        let business = this.state.winBusiness

        axios.post('/user/addBusiness',
          {
            username: username,
            business: business
          })
        .then(() => {
          console.log('updated business')
        })
        .catch((err) => {
          console.error(err)
        })
      }
    })
  }

  toggleMap (event) {
    this.setState({isMapShowing: !this.state.isMapShowing})
  }

  render () {
    if (this.state.isMapShowing === false) {
      return (
        <Article
          margin={{
            'left': 'large',
            'right': 'large',
            'top': 'small',
            'bottom': 'small'}}
          pad={{'top': 'none',
            'right': 'none',
            'left': 'none',
            'bottom': 'none'}}
          justify='center'
          align='center'>
          <Section>
            <h3>{this.state.winBusiness.name}</h3>
          </Section>
          <Image src={this.state.winBusiness.image_url} alt='Business Image' />
          <Section
            pad={{'top': 'none',
              'bottom': 'none'}}
            margin={{
              'top': 'none',
              'bottom': 'none'}}
            justify='center'
            align='center'
            textAlign='center'>
            <Section>
              {this.state.winBusiness.categories ? this.state.winBusiness.categories.map((catogs) => {
                return <div key={catogs.title}>{catogs.title}</div>
              }) : null }
              <br />
              <hr />
              <div onClick={this.toggleMap}>
                {this.state.winBusiness.location ? this.state.winBusiness.location.display_address.map((add) => {
                  return <div key={add}>{add}</div>
                }) : null}
                <br />
                <hr />
              </div>
              <p>{this.state.winBusiness.display_phone ? this.state.winBusiness.display_phone : 'Number Not Available'}</p>
              <p>{this.state.winBusiness.price}</p>
            </Section>
          </Section>
        </Article>
      )
    } else {
      return (
        <div className='card'>
          <div className='card-block'>
            { this.state.winBusiness.coordinates ? <Map lat={this.state.winBusiness.coordinates.latitude} long={this.state.winBusiness.coordinates.longitude} />
              : null
            }
          </div>
          <div>
            <button className='btn btn-primary rounded-circle btn-circle' onClick={this.toggleMap}>Back</button>
          </div>
        </div>
      )
    }
  }
}

export default Winner
