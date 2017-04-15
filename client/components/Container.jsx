import React, { Component } from 'react'
import App from 'grommet/components/App'

class Container extends Component {
  render () {
    return (
      <App>
        {this.props.children}
      </App>
    )
  }
}

export default Container
