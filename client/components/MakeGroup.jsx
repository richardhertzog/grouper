import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class MakeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      businessType: '',
      location: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.businessClick = this.businessClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(`submitting yelp api params: groupName: ${this.state.groupName}, businessType: ${this.state.businessType}, location: ${this.state.location}`);
    axios.post('http://localhost:3000/api/groups',
      { groupName: this.state.groupName,
        location: this.state.location,
        eventType: this.state.businessType,
      })
    .then((response) => {
      console.log(response);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  businessClick(event) {
    this.setState({ businessType: event.target.id });
  }

  render() {
    return (
      <div className="card">
        <div className="card-block mx-auto">
          <h4 className="card-title">Set up a group!</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input className="form-control" placeholder="Group Name" name="groupName" type="text" value={this.state.groupName} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Neighborhood" name="location" type="text" value={this.state.location} onChange={this.handleChange} required />
            </div>
            <div className="form-group row mx-auto">
              <div className="btn-group btn-group-md mr-2">
                <button className="btn btn-primary" id="bars" onClick={this.businessClick}>Booze</button>
              </div>
              <div className="btn-group btn-group-md mr-2">
                <button className="btn btn-primary" id="restaurants" onClick={this.businessClick}>Foods</button>
              </div>
              <div className="btn-group btn-group-md mr-2">
                <button className="btn btn-primary" id="parks" onClick={this.businessClick}>Parks</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MakeGroup;
