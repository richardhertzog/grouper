import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'


class Voting extends Component {
  constructor (props) {
    super (props);
    this.state = {
      businesses : [],
      curBusiness : {}
    }
    this.populateState = this.populateState.bind(this)
    this.populateState();
  }

  populateState() {
    axios.get('http://localhost:3000/api/groups', {
      params: {
        groupName: this.props.name
      }
    })
    .then(function (response) {
      console.log(response);
    })
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="card" style={{ width: '400' }}>
          <img className="card-img-top img-thumbnail" src="https://s3-media1.fl.yelpcdn.com/bphoto/RegvLCW5wKLCLmNGsQeC4w/o.jpg" alt="Business Image" />
          <div className="card-block">
            <h4 className="card-title">Alba Rays</h4>
            <p className="card-text">$$    Creole, Cajun</p>
            <a href="#" className="btn btn-primary mr-2">YES</a>
            <a href="#" className="btn btn-primary mr-2">NO</a>
          </div>
        </div>*/}
        <img src={this.state.curBusiness.img_url} >
        <div>{this.state.curBusiness.name}</div>
        <div>{this.state.curBusiness.price}</div>
        <div>{this.state.curBusiness.name}</div>
      </div>
    );
  }
}

export default Voting;
