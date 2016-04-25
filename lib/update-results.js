const setSurvey = require('./set-survey');
const currentResultText = require('./current-result-text');

module.exports = (survey, message, app) => {
  for (var i=0; i < survey.responses.length; i++) {
    currentResult = survey.results[survey.responses[i]];
    updatedResult = currentResult.filter(id => id !== message.socketId);
    survey.results[survey.responses[i]] = updatedResult;
  }
  survey.results[message.vote].push(message.socketId);
  survey.resultText = currentResultText(survey.results);
  console.log("results", survey.results);
  console.log("text", survey.resultText);
  setSurvey(survey.id, survey, app);
  return survey;
};
