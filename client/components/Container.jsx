import React, { Component } from 'react'
import App from 'grommet/components/App'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'

class Container extends Component {
  render () {
    console.log(this.props.children)
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
