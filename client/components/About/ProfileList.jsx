import React, { Component } from 'react'

// App components
import Profile from './Profile.jsx'

// grommet components
import Columns from 'grommet/components/Columns'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'

const team = [
    { 
      name: 'Aidan Bane', 
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
      githubUrl: 'https://github.com/anirvan90',
      linkedinUrl: 'https://www.linkedin.com/in/anirvanawatramani/'
    }, 
    { 
      name: 'Erik Thompson', 
      key:'2',
      profilePhoto: 'https://avatars0.githubusercontent.com/u/20330256?v=3&s=400',
      description: 'Erik is Bread!',
      githubUrl: 'https://github.com/ErikJamesThompson',
      linkedinUrl: 'https://www.linkedin.com/in/erikjamesthompson/'
    }, 
    { 
      name: 'Richard Hertzog', 
      key:'3',
      profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAnOAAAAJGJhMGExODEwLTYzM2EtNDgzNi1iMDYyLTkzMDA5MjMxYzg4Yg.jpg',
      description: 'Richard is Awesome!',
      githubUrl: 'https://github.com/richardhertzog',
      linkedinUrl: 'https://www.linkedin.com/in/richard-hertzog/'
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
