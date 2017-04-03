import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'


class Voting extends Component {
  constructor (props) {
    super (props);
    this.state = {
      curBusiness: {},
      businesses: [],
      vote: 0
    }
    this.populateState = this.populateState.bind(this)
    this.yesButton = this.yesButton.bind(this)
    this.populateState();
  }

  populateState() {
    let name = this.props.location.pathname.slice(8)
    axios.get('http://localhost:3000/api/groups', {
      params:{
        groupName: name
      }
    })
    .then(function (response) {
      return response.data.pop()
    })
    .then((res) => {
      console.log(res)
      let result = res.yelpApiContent
      this.setState({curBusiness: result[0]})
      let tmp = this.state.businesses.concat([result]);
      this.setState({businesses: result})
    })
  }

  yesButton(event) {
    let biz = this.state.businesses.unshift()
    this.setState({businesses: biz})
    this.setState({vote: 1})
  }

  noButton(event) {

  }

  renderNextReasturant() {

  }

  sendVotesServer() {

  }

  render() {
    return (
      <div>
        <div className="card" style={{'width': '400'}}>
          <img className="card-img-top img-thumbnail" src={this.state.curBusiness.image_url} alt="Business Image" />
          <div className="card-block">
            <h4 className="card-title">{this.state.curBusiness.name}</h4>
            <p className="card-text">{this.state.curBusiness.price}</p>
            <a href="#" className="btn btn-primary mr-2" onClick={this.yesButton}>YES</a>
            <a href="#" className="btn btn-primary mr-2">NO</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Voting;
