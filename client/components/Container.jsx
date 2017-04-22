import React, { Component } from 'react'
import App from 'grommet/components/App'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

class Container extends Component {
  render () {
    if (window.innerWidth < 450) {
      return (
        <App>
          <Nav />
          {this.props.children}
      </App>
      )
    }
    return (
      <App>
        <Nav />
        {this.props.children}
        <Footer />
      </App>
    )
  }
}

export default Container
