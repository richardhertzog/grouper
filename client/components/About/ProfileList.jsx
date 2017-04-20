import React, { Component } from 'react'

// App components
import Profile from './Profile.jsx'

// grommet components
import Article from 'grommet/components/Article'
import Headline from 'grommet/components/Headline'
import Section from 'grommet/components/Section'

const team = [
      { name: 'Aidan', key:'0'}, 
      { name: 'Anirvan', key:'1' }, 
      { name: 'Erik', key:'2' }, 
      { name: 'Richard', key:'3' },
  ]
  
const TeamMembers = team.map((member) => <Profile key={member.key} name={member.name} /> )

class ProfileList extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <Article>
        <Section pad='large'
          justify='center'
          align='center'>
          <Headline margin='none'>
            About Us
          </Headline>
        </Section>
        {TeamMembers}
      </Article>
    )
  }
}

export default ProfileList
