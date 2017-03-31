import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class MakeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      businessType: '',
      location: ''
    }

    this.handleSubmit  = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.businessClick = this.businessClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(`submitting yelp api params: groupName: ${this.state.groupName}, businessType: ${this.state.businessType}, location: ${this.state.location}`)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  businessClick(event) {
    this.setState({ businessType: event.target.id })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Group Name:
            <input name="groupName" type="text" value={this.state.groupName} onChange={this.handleChange} />
          </label>
          <div>
            <div className="businessTypeButtons" id="bars" onClick={this.businessClick}>Booze</div>
            <div className="businessTypeButtons" id="restaurants" onClick={this.businessClick}>Foods</div>
          </div>
          <label>
            Location:
            <input name="location" type="text" value={this.state.location} onChange={this.handleChange} />
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MakeGroup;
