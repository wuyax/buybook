const assert = require('chai').assert
const expect = require('chai').expect
const util = require('../src/assets/js/mochaTest')
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
describe('unique', function() {
  it('should return a new unique array', function() {
    let arr = [1,1,2,3,4,4]
    expect(util.unique(arr)).to.deep.equal([1,2,3,4])
  })
  it('if pass empty arr should return empty arr', function() {
    expect(util.unique([])).to.deep.equal([])
  })
})