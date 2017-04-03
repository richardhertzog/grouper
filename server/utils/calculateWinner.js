const _ = require('underscore')

function calculateWinner (group) {
  let votesArray = group.votes
  let votesResult = _(votesArray).groupBy('yelpApiId')
  let output = _(votesResult).map((elem, key) => {
    return { yelpApiId: key,
      vote: _(elem).reduce((a, b) => { return a + b.vote }, 0)}
  })
  let result = _.max(output, function (item) { return item.vote })
  group.winner = result.yelpApiId
  group.isVoting = false
  return group
}

module.exports.calculateWinner = calculateWinner
