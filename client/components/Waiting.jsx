import React, { Component, PropTypes } from 'react'

class Waiting extends Component {
  constructor (props) {
    super(props)
    this.state
  }
  
  render () {
    return (
      <div>
        <p>Waiting.jsx Waiting for other users etc ......</p>
        {this.props.name}
      </div>
    )
  }
}

Waiting.propTypes = {

}

export default Waiting
