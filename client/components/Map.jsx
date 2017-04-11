import React, { Component } from 'react'
import loadJS from 'loadjs'

class Map extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAsBbke-ms3Uj72gc8scu6r5wmMV9hJDDk', {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: this.props.location.latitude, lng: this.props.location.longitude },
          zoom: 12
        })
        this.bounds = new window.google.maps.LatLngBounds()
      }
    })
  }

  componentWillUnmount () {
    window.google = null
  }
  render () {
    console.log(this.props.location.latitude)
    return (
      <div className='map' style={{height: '100%', width: '100%', position: 'relative'}}>
        <div id='map' />
      </div>
    )
  }
}

export default Map
