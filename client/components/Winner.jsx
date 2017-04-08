import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

class Winner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      winBusiness: {}
    }
    this.populateState = this.populateState.bind(this)
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

  render() {
    return (
      <div className='card' style={{'width': '400px'}}>
        {this.props.name}
          WINNER
          <img className='card-img-top img-thumbnail' src={this.state.winBusiness.image_url} alt='Business Image' />
          <div className='card-block'>
            <h4 className='card-title'>{this.state.winBusiness.name}</h4>
            <p className='card-text'>{this.state.winBusiness.price}</p>
          </div>
        </div>
    );
  }
}

export default Winner;
