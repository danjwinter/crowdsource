const getSurvey = require('../lib/get-survey');
const app = require('../server');
const chai = require('chai');
const assert = chai.assert;

describe('.getSurvey', () => {
  before(() => {
    app.locals.surveys = {};
  });

  after(() => {
    app.locals.surveys = {};
  });

  it('should get the correct survey', () => {
    var sampleSurvey = {survey: "sample survey"};
    app.locals.surveys['1'] = sampleSurvey;

    var actualReturnedSurvey = getSurvey('1', app);
    assert.deepEqual(actualReturnedSurvey, sampleSurvey);
  });
});
