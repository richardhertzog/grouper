import React, { Component } from 'react'
import App from 'grommet/components/App'
import Nav from './Nav.jsx'

class Container extends Component {
  render () {
    return (
      <App>
        <Nav />
        {this.props.children}
      </App>
    )
  }
}

export default Container
