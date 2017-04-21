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
    key: '0',
    profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAelAAAAJGU4ZmYxN2M4LWQ2NmUtNDYzMy04MThlLWFhYzZkNTU2MDc1YQ.jpg',
    description: 'After his 15th severe concussion from underground fights in Thailand he retired to run an illegal gambling ring in Columbia. Fast forward being extradited to Ecuador and a long series of trials, he now resides in San Francisco where he makes fun, responsive web apps with a small team of developers!',
    githubUrl: 'https://github.com/BlindBane',
    linkedinUrl: 'https://www.linkedin.com/in/aidanbane/'
  },
  {
    name: 'Anirvan',
    key: '1',
    profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAQgAAAAJDU3MWRjNGQ1LTVmYmItNDg1MS1hYjNkLTIxOWZkMzA0NjM0Yg.jpg',
    description: 'At the age of 8 he won his first bird calling competition, specializing in warblers. After 14 years of riding his celebrity status he decided to join a bootcamp called Hack Reactor and start a new exciting life as a software engineer!',
    githubUrl: 'https://github.com/anirvan90',
    linkedinUrl: 'https://www.linkedin.com/in/anirvanawatramani/'
  },
  {
    name: 'Erik Thompson',
    key: '2',
    profilePhoto: 'https://avatars0.githubusercontent.com/u/20330256?v=3&s=400',
    description: 'A Hypotenuse\nIs on the opposite side\nOf the right angle',
    githubUrl: 'https://github.com/ErikJamesThompson',
    linkedinUrl: 'https://www.linkedin.com/in/erikjamesthompson/'
  },
  {
    name: 'Richard Hertzog',
    key: '3',
    profilePhoto: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAnOAAAAJGJhMGExODEwLTYzM2EtNDgzNi1iMDYyLTkzMDA5MjMxYzg4Yg.jpg',
    description: "I'm a full stack kind of guy.",
    githubUrl: 'https://github.com/richardhertzog',
    linkedinUrl: 'https://www.linkedin.com/in/richard-hertzog/'
  }
]

const TeamMembers = team.map((member) => <Profile key={member.key} name={member.name} profilePhoto={member.profilePhoto} description={member.description} githubUrl={member.githubUrl} linkedinUrl={member.linkedinUrl} />)

class ProfileList extends Component {
  constructor (props) {
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
