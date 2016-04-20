const express = require('express');
const app = express();
app.set('view engine', 'jade');
const bodyParser = require('body-parser');
const createSurvey = require('./lib/create-survey');
const getSurvey = require('./lib/get-survey');
app.use(bodyParser());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Crowdsource';

app.locals.surveys = {};
app.locals.id = 0;

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/survey/:id', (request, response) => {
  var id = request.params.id;
  var survey = getSurvey(id, app);
  response.locals = { survey: survey };

  if(survey.polleesSeeResults) {
    response.render('survey-and-results');
  } else {
    response.render('survey-only');
  }
});

app.post('/', function(request, response) {
  var survey = createSurvey(request.body, app);
  var adminLink = `/survey/${survey.id}`;
  var surveyLink = `/admin/${survey.id}`;
  response.locals = {question: survey.question, admin: adminLink, survey: surveyLink};
  response.render('survey-links');
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
