import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Map from './Map.jsx'
import axios from 'axios'

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
  }

  toggleMap (event) {
    // event.preventDefault()
    this.setState({isMapShowing: !this.state.isMapShowing})
  }

  render () {
    if (this.state.isMapShowing === false) {
      return (
        <div className='card' style={{'width': '400px'}}>
          {this.props.name}
          WINNER
          <img className='card-img-top img-thumbnail' src={this.state.winBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <div>

              {this.state.winBusiness.categories ? this.state.winBusiness.categories.map((catogs) => {
                return <div key={catogs.title}>{catogs.title}</div>
              }) : null }
              <div onClick={this.toggleMap}>
                {this.state.winBusiness.location ? this.state.winBusiness.location.display_address.map((add) => {
                  return <div key={add}>{add}</div>
                }) : null}
              </div>
            </div>
            <p className='card-text'>{this.state.winBusiness.display_phone ? this.state.winBusiness.display_phone : 'Number Not Available'}</p>
            <h4 className='card-title'>{this.state.winBusiness.name}</h4>
            <p className='card-text'>{this.state.winBusiness.price}</p>
          </div>
        </div>
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
