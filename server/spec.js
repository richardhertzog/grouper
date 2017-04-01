const app = require('./index.js')
const request = require('supertest')
const chai = require('chai').expect

describe('[apiRouter]', function () {
  it('should GET all groups', function (done) {
    request(app)
      .get('/api/groups')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        chai(resp.body).to.be.an('array')
        done()
      })
  })
})
