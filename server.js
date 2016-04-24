const express = require('express');
const http = require('http');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
const createSurvey = require('./lib/create-survey');
const getSurvey = require('./lib/get-survey');
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

app.post('/', function(request, response) {
  var survey = createSurvey(request.body, app);
  var adminLink = `/admin/${survey.id}`;
  var surveyLink = `/survey/${survey.id}`;
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
    if (channel == "voteCast") {
      var survey = getSurvey(message.id, app);
      for (var i=0; i < survey.responses.length; i++) {
        currentResult = survey.results[survey.responses[i]];
        updatedResult = currentResult.filter(id => id !== message.socketId);
        survey.results[survey.responses[i]] = updatedResult;
      }
      survey.results[message.vote].push(message.socketId);
      console.log(survey);
    }
  });

  socket.on('disconnect', function() {
    console.log('A user has disconnected.', io.engine.clientsCount);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });
});

module.exports = app;
module.exports = server;
