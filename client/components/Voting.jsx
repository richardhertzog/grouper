import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Voting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card" style={{'width': '400'}}>
          <img className="card-img-top img-thumbnail" src="https://s3-media1.fl.yelpcdn.com/bphoto/RegvLCW5wKLCLmNGsQeC4w/o.jpg" alt="Business Image" />
          <div className="card-block">
            <h4 className="card-title">Alba Rays</h4>
            <p className="card-text">$$    Creole, Cajun</p>
            <a href="#" className="btn btn-primary mr-2">YES</a>
            <a href="#" className="btn btn-primary mr-2">NO</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Voting;