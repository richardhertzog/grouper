import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import CopyToClipboard from 'react-copy-to-clipboard'


class VoterLanding extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // renderVote: false
    }
    // this.goToVoting=this.goToVoting.bind(this)
  }

  // goToVoting() {
  //   event.preventDefault()
  //   console.log(this.props.name)
  //   console.log(`/voting/group/${this.props.name}`)
  //   this.setState({renderVote: true})
  // }


  render () {
  // if (this.state.renderVote) {
  //     return (<Redirect to={`/voting/group/${this.props.name}`} />)
  //   }
    return(
      <div>
        <h1>WELCOME TO USE</h1>
        <div className='card text-center' style={{'width': '400px'}}>
            <h3 className='card-header'>{this.props.name}</h3>
            <div className='card-block'>
              {/*<a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle' onClick={this.goToVoting}>Start Voting</a>*/}
              {/*<a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle'>Share Group</a>*/}


              
              {/*need to figure out Link and redirect issue*/}
              <Link to={`/voting/group/${this.props.name}`}><a href='#' className='btn btn-primary mr-2 rounded-circle btn-circle'>Start Voting</a></Link>
              <div>
                <CopyToClipboard text={window.location.href}
                  onCopy={() => this.setState({copied: true})}>
                  <button>{this.props.name}</button>
                </CopyToClipboard>
                {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default VoterLanding
