import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class MakeGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      groupName: '',
      businessType: '',
      location: '',
      endTime: 2,
      renderVote: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.businessClick = this.businessClick.bind(this)
    this.changeTime = this.changeTime.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    let time = this.state.endTime
    time = time * 60 * 1000 + Date.now()
    axios.post('/api/groups',
      { groupName: this.state.groupName,
        location: this.state.location,
        eventType: this.state.businessType,
        endTime: time
      })
    .then(() => {
      this.setState({ renderVote: true })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  businessClick (event) {
    event.preventDefault()
    this.setState({ businessType: event.target.id })
  }

  changeTime (event) {
    event.preventDefault()
    let time = Number(event.target.value) + this.state.endTime
    this.setState({endTime: time})
  }

  render () {
    if (this.state.renderVote) {
      return (<Redirect to={`/voting/group/${this.state.groupName}`} />)
    }

    return (
      <div className='card'>
        <div className='card-block mx-auto'>
          <h4 className='card-title'>Create a group!</h4>
          <form>
            <div className='form-group'>
              <input className='form-control' placeholder='Group Name' name='groupName' type='text' value={this.state.groupName} onChange={this.handleChange} required />
            </div>
            <div className='form-group'>
              <input className='form-control' placeholder='Neighborhood' name='location' type='text' value={this.state.location} onChange={this.handleChange} required />
            </div>
            <div className='form-group row mx-auto'>
              <div className='btn-group btn-group-md mr-2'>
                <button className='btn btn-primary' id='bars' onClick={this.businessClick}>Booze</button>
              </div>
              <div className='btn-group btn-group-md mr-2'>
                <button className='btn btn-primary' id='restaurants' onClick={this.businessClick}>Foods</button>
              </div>
              <div className='btn-group btn-group-md'>
                <button className='btn btn-primary' id='parks' onClick={this.businessClick}>Parks</button>
              </div>
            </div>
              <div className='btn-group btn-group-md plusMinus-button'>
                <div>
                <button className='btn btn-primary rounded-circle btn-circle2' value={-1} id='minus' onClick={this.changeTime}>-</button>
                </div>
                <h3>{this.state.endTime}</h3>
                <div>
                <button className='btn btn-primary rounded-circle btn-circle2' value={1} id='plus' onClick={this.changeTime}>+</button>
                </div>
              </div>
            <div className='form-group row mx-auto'>
              <div className='btn-block btn-md'>
                <button className='btn btn-primary btn-md btn-block' id='submit' onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default MakeGroup
