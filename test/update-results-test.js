const updateResults = require('../lib/update-results');
const app = require('../server');
const chai = require('chai');
const assert = chai.assert;

describe('.updatedResults', () => {
  before(() => {
    app.locals.surveys = {};
  });

  after(() => {
    app.locals.surveys = {};
  });

  it('should update results', () => {
    var sampleSurvey = {
      question: 'What is your favorite color?',
      responses: [ 'Red', 'Blue', 'Green' ],
      closeTimer: '',
      actualCloseTime: '',
      polleesSeeResults: 'true',
      id: 1,
      results: { Red: [], Blue: [], Green: [] },
      resultText: 'Red: 0 Blue: 0 Green: 0 ',
      pollOpen: true };

    var sampleMessage = { id: '1', vote: 'Blue', socketId: 'WcOAOT9scp5S8NxzAAAF' };
    app.locals.surveys['1'] = sampleSurvey;

    var expectedSurvey = {
      question: 'What is your favorite color?',
      responses: [ 'Red', 'Blue', 'Green' ],
      closeTimer: '',
      actualCloseTime: '',
      polleesSeeResults: 'true',
      id: 1,
      results: { Red: [], Blue: [ 'WcOAOT9scp5S8NxzAAAF' ], Green: [] },
      resultText: 'Red: 0 Blue: 1 Green: 0 ',
      pollOpen: true
    };

    var survey = updateResults(sampleSurvey, sampleMessage, app);
    assert.deepEqual(survey, expectedSurvey);
    assert.deepEqual(app.locals.surveys, {'1': expectedSurvey});
  });
});
