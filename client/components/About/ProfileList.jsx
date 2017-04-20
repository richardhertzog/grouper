import React, { Component } from 'react'

// App components
import Profile from './Profile.jsx'

// grommet components
import Columns from 'grommet/components/Columns'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'

const team = [
    { 
      name: 'Aidan', 
      key:'0',
      profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAelAAAAJGU4ZmYxN2M4LWQ2NmUtNDYzMy04MThlLWFhYzZkNTU2MDc1YQ.jpg',
      description: 'Aidan is Awesome!',
      githubUrl: 'https://github.com/BlindBane',
      linkedinUrl: 'https://www.linkedin.com/in/aidanbane/'
    }, 
    { 
      name: 'Anirvan', 
      key:'1',
      profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAQgAAAAJDU3MWRjNGQ1LTVmYmItNDg1MS1hYjNkLTIxOWZkMzA0NjM0Yg.jpg',
      description: 'Anirvan is Awesome!',
      githubUrl: '',
      linkedinUrl: ''
    }, 
    { 
      name: 'Erik', 
      key:'2',
      profilePhoto: 'https://c1.staticflickr.com/3/2355/2104039823_b47da37172_b.jpg',
      description: 'Erik is Bread!',
      githubUrl: '',
      linkedinUrl: ''
    }, 
    { 
      name: 'Richard', 
      key:'3',
      profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAnOAAAAJGJhMGExODEwLTYzM2EtNDgzNi1iMDYyLTkzMDA5MjMxYzg4Yg.jpg',
      description: 'Richard is Awesome!',
      githubUrl: '',
      linkedinUrl: ''
    },
  ]
  
const TeamMembers = team.map((member) => <Profile key={member.key} name={member.name} profilePhoto={member.profilePhoto} description={member.description} githubUrl={member.githubUrl} linkedinUrl={member.linkedinUrl} /> )

class ProfileList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Columns masonry={false}
        size='small'
        justify='between'>
        {TeamMembers}
      </Columns>
    )
  }
}

export default ProfileList
