const setSurvey = require('./set-survey');
const currentResultText = require('./current-result-text');

var cleanResponses = (body) => {
  var surveyResponses = [];
  if (body.firstResponse) surveyResponses.push(body.firstResponse);
  if (body.secondResponse) surveyResponses.push(body.secondResponse);
  if (body.thirdResponse) surveyResponses.push(body.thirdResponse);
  if (body.fourthResponse) surveyResponses.push(body.fourthResponse);
  return surveyResponses;
};

var cleanResults = (body) => {
  var surveyResults = {};
  if (body.firstResponse) surveyResults[body.firstResponse] = [];
  if (body.secondResponse) surveyResults[body.secondResponse] = [];
  if (body.thirdResponse) surveyResults[body.thirdResponse] = [];
  if (body.fourthResponse) surveyResults[body.fourthResponse] = [];
  return surveyResults;
};

var createSurvey = (body, app) => {
  var responses = cleanResponses(body);
  var surveyId = ++app.locals.id;
  var results = cleanResults(body);
  var resultText = currentResultText(results);
  var survey = {
    question: body.question,
    responses: responses,
    closeTime: body.closeTime,
    polleesSeeResults: body.polleesSeeResults,
    id: surveyId,
    results: results,
    resultText: resultText,
    pollOpen: true
  };
  setSurvey(surveyId, survey, app);
  return survey;
};

module.exports = createSurvey;
