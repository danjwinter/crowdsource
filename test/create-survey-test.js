const createSurvey = require('../lib/create-survey');
const app = require('../server');
const chai = require('chai');
const assert = chai.assert;

describe('.createSurvey', () => {
  before(() => {
    app.locals.surveys = {};
  });

  after(() => {
    app.locals.surveys = {};
  });

  it('should create a survey', () => {
    var sampleBody = { question: 'What is your favorite color?',
                       firstResponse: 'Red',
                       secondResponse: 'Blue',
                       thirdResponse: 'Green',
                       fourthResponse: '',
                       polleesSeeResults: 'true',
                       closeTimer: '' };

    var expectedSurvey = { question: 'What is your favorite color?',
                           responses: [ 'Red', 'Blue', 'Green' ],
                           closeTimer: '',
                           actualCloseTime: '',
                           polleesSeeResults: 'true',
                           id: 1,
                           results: { Red: [], Blue: [], Green: [] },
                           resultText: ' Red: 0 Blue: 0 Green: 0',
                           pollOpen: true };

    var survey = createSurvey(sampleBody, app);
    assert.deepEqual(survey, expectedSurvey);
    assert.deepEqual(app.locals.surveys, {'1': expectedSurvey});
  });
});
