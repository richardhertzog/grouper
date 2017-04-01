import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class MakeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      businessType: '',
      location: '',
      renderVote: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.businessClick = this.businessClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:3000/api/groups',
      { groupName: this.state.groupName,
        location: this.state.location,
        eventType: this.state.businessType,
      })
    .then(() => {
      this.setState({ renderVote: true });
    }).catch((err) => {
      console.error(err);
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  businessClick(event) {
    this.setState({ businessType: event.target.id });
  }

  render() {
    if (this.state.renderVote) {
      return (<Redirect to={`/voting/${this.state.groupName}`} components={this.state.groupName} />);
    }

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
