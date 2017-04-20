import React from 'react'
import ReactDOM from 'react-dom'
import Home from '../Home'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import App from '../../App'
import Jest from 'jest'
import Waiting from '../Waiting'

describe('App', () => {
  let app;

  beforeAll(() => {
    app = shallow(<App />);
  })

  it('App contains a container around components', () => {
    expect(app.find('Container').length).toEqual(1)
  })

  it('App contains the correct amount of Routes to components', () => {
    expect(app.find('Route').length).toEqual(8)
  })
})

describe('Home', () => {
  let waiting;

  beforeAll(() => {
    waiting = shallow(<Waiting />);
  })

  it('Waiting contains chat', () => {
    expect(waiting.find('Chat').length).toEqual(1)
  })

  it('App contains the the countdown clock', () => {
    expect(waiting.find('ReactCountdownClock').length).toEqual(1)
  })
})