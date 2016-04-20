const setSurvey = require('./set-survey');

var cleanResponses = (body) => {
  var surveyResponses = [];
  if (body.firstResponse) surveyResponses.push(body.firstResponse);
  if (body.secondResponse) surveyResponses.push(body.secondResponse);
  if (body.thirdResponse) surveyResponses.push(body.thirdResponse);
  if (body.fourthResponse) surveyResponses.push(body.fourthResponse);
  return surveyResponses;
};

var createSurvey = (body, app) => {
  var responses = cleanResponses(body);
  var surveyId = ++app.locals.id;
  var survey = {
    question: body.question,
    responses: responses,
    closeTime: body.closeTime,
    polleesSeeResults: body.polleesSeeResults,
    id: surveyId
  };
  setSurvey(surveyId, survey, app);
  return survey;
};

module.exports = createSurvey;
