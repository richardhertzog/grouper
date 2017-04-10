import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

class Winner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      winBusiness: {}
    }
    this.populateState = this.populateState.bind(this)
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

  render () {
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
            {this.state.winBusiness.location ? this.state.winBusiness.location.display_address.map((add) => {
              return <div key={add}>{add}</div>
            }) : null}

          </div>
          <p className='card-text'>{this.state.winBusiness.display_phone ? this.state.winBusiness.display_phone : 'Number Not Available'}</p>
          <h4 className='card-title'>{this.state.winBusiness.name}</h4>
          <p className='card-text'>{this.state.winBusiness.price}</p>
        </div>
      </div>
    )
  }
}

export default Winner
