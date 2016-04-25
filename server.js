const express = require('express');
const http = require('http');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const createSurvey = require('./lib/create-survey');
const getSurvey = require('./lib/get-survey');
const setSurvey = require('./lib/set-survey');
const updateResults = require('./lib/update-results');

app.use(bodyParser());
app.use(express.static('public'));
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

function closeThatPoll() {
  this.pollOpen = false;
  setSurvey(this.id, this, app);
  io.emit("pollClosed", this.id);
}

app.get('/admin/:id', (request, response) => {
  var id = request.params.id;
  var survey = getSurvey(id, app);
  response.locals = { survey: survey };
  response.render('admin');
});

app.post('/', function(request, response) {
  var survey = createSurvey(request.body, app);
  var adminLink = `/admin/${survey.id}`;
  var surveyLink = `/survey/${survey.id}`;
  if (survey.closeTimer !== "") {
    setTimeout(closeThatPoll.bind(survey), survey.closeTimer);
  }
  response.locals = {question: survey.question, admin: adminLink, survey: surveyLink};
  response.render('survey-links');
});

var port = process.env.PORT || app.get('port');

var server = http.createServer(app)
                 .listen(port, function() {
  console.log('Listening on port' + port + '.');
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function(socket) {
  socket.on('message', function (channel, message) {
    var survey = getSurvey(message.id, app);
    if (channel === "voteCast") {
      survey = updateResults(survey, message, app);
      io.emit('results', {id: survey.id, resultText: survey.resultText});
    }
    if (channel === "closePoll") {
      survey.pollOpen = false;
      setSurvey(survey.id, survey, app);
      io.emit('pollClosed', message);
    }
  });
});

module.exports = app;
