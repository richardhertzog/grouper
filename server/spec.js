process.env.NODE_ENV = 'testing'

const app = require('./index.js')
const request = require('supertest')
const chai = require('chai').expect

describe('[apiRouter]', function () {
  const testGroup = {
    'groupName': 'test',
    'location': '611 Mission St. San Francisco, CA',
    'eventType': 'bar'
  }

  it('should create a new group on a POST to /api/groups', function (done) {
    request(app)
    .post('/api/groups')
    .send(testGroup)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function (err, resp) {
      if (err) done(err)
      chai(resp.body).to.be.an('object')
      done()
    })
  })

  it('should GET all groups', function (done) {
    request(app)
    .get('/api/groups')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, resp) {
      if (err) throw err
      chai(resp.body).to.be.an('array')
      done()
    })
  })

  it('should GET one group', function (done) {
    request(app)
    .get('/api/groups/test')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, resp) {
      if (err) throw err
      chai(resp.body).to.be.an('object')
      done()
    })
  })
})
