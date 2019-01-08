const assert = require('chai').assert
const util = require('../src/assets/js/mochaTest')
describe('Sum', function () {
  it('1+2 should queal 3', function () {
    assert.equal(util.sum(1, 2), 3)
  })
})