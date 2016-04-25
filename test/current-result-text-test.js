const currentResultText = require('../lib/current-result-text');
const chai = require('chai');
const assert = chai.assert;

describe('.currentResultText', () => {
  it('should return correct tallying of results', () => {
    var sampleResults = {
      Red: [],
      'No Blue!': [],
      'GREEEEN!': [ 'SDGHY_XPfSjlUJ4jAAAH', '8gYvHd7aPlKU5IlcAAAF' ] };

      var actualText = currentResultText(sampleResults);
      var expectedText = "Red: 0 No Blue!: 0 GREEEEN!: 2 ";
      assert.equal(actualText, expectedText);
  });
});
