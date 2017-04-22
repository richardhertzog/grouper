import React, { Component } from 'react'
import loadJS from 'loadjs'

class Map extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDgJ0jNERdCkiei405COL2yLiezQtAUu_Y', {
      success: () => {
        this.map = new window.google.maps.Map(document.getElementById('showmap'), {
          center: { lat: this.props.lat, lng: this.props.long },
          zoom: 14
        })

        this.marker = new google.maps.Marker({
          position: { lat: this.props.lat, lng: this.props.long },
          map: this.map,
          animation: window.google.maps.Animation.DROP
        })
      },
      error: () => {
        console.log('Map Is Fooked!')
      }
    })
  }
  componentWillUnmount () {
    window.google = null
  }
  render () {
    return (
      <div>
        <div id='showmap' style={{height: window.innerHeight * 0.75, width: window.innerWidth * 0.9, postion: 'relative'}} />
      </div>
    )
  }
}

export default Map
