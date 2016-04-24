const express = require('express');
const http = require('http');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const createSurvey = require('./lib/create-survey');
const getSurvey = require('./lib/get-survey');
const setSurvey = require('./lib/set-survey');
const currentResultText = require('./lib/current-result-text');

app.use(bodyParser());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Crowdsource';

app.locals.surveys = {};
app.locals.id = 0;

app.get('/', (request, response) => {
  response.render('index');
});

var counter = 0;

app.get('/survey/:id', (request, response) => {
  var id = request.params.id;
  var survey = getSurvey(id, app);
  response.locals = { survey: survey };
  console.log(survey, ++counter);
  if(survey.polleesSeeResults) {
    response.render('survey-and-results');
  } else {
    response.render('survey-only');
  }
});
var closeThatPoll = function() {
  this.pollOpen = false;
  setSurvey(this.id, this, app);
  io.emit("pollClosed", this.id);
};

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

  if (survey.closeTime !== "") {

    setTimeout(closeThatPoll.bind(survey), parseInt(survey.closeTime));
  }
  response.locals = {question: survey.question, admin: adminLink, survey: surveyLink};
  response.render('survey-links');
});


// if (!module.parent) {
//   app.listen(app.get('port'), () => {
//     console.log(`${app.locals.title} is running on ${app.get('port')}.`);
//   });
// }

var port = process.env.PORT || app.get('port');

var server = http.createServer(app)
                 .listen(port, function() {
  console.log('Listening on port' + port + '.');
});

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function(socket) {
  console.log('A user has connected', io.engine.clientsCount);

  socket.on('message', function (channel, message) {
    var survey = getSurvey(message.id, app);
    if (channel === "voteCast") {
      if (survey.pollOpen) {
        for (var i=0; i < survey.responses.length; i++) {
          currentResult = survey.results[survey.responses[i]];
          updatedResult = currentResult.filter(id => id !== message.socketId);
          survey.results[survey.responses[i]] = updatedResult;
        }
        survey.results[message.vote].push(message.socketId);
        console.log(currentResultText(survey.results));
        survey.resultText = currentResultText(survey.results);
        setSurvey(survey.id, survey, app);
        io.emit('results', {id: survey.id, resultText: survey.resultText});
      }
    }
    if (channel === "closePoll") {
      console.log('received poll closed', message);
      io.emit('pollClosed', message);
    }
  });

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = app;
module.exports = server;
