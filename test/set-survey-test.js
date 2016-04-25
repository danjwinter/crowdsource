const setSurvey = require('../lib/set-survey');
const app = require('../server');
const chai = require('chai');
const assert = chai.assert;

describe('.currentResultText', () => {
  before(() => {
    app.locals.surveys = {};
  });

  after(() => {
    app.locals.surveys = {};
  });

  it('should get the correct survey', () => {
    var sampleSurvey = {survey: "sample survey"};
    setSurvey('1', sampleSurvey, app);
    var actualSurveys = app.locals.surveys;
    var expectedSurveys = {'1': sampleSurvey};
    assert.deepEqual(actualSurveys, expectedSurveys);
  });
});
