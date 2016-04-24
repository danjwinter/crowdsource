var socket = io();

var closePoll = document.querySelector('#close-poll');
var pollStatus = document.querySelector('#poll-status');
var currentId = window.location.href.split("admin/")[1];

closePoll.addEventListener('click', function () {
  socket.send('closePoll', currentId);
});

socket.on('pollClosed', function(message) {
  pollStatus.innerText = "This poll has been closed";
});


var results = document.querySelector('.results');

socket.on('results', function (message) {
  console.log('got results');
  if (message.id == currentId) {
    var survey = message.results;
    resultText = "";
    for (var key in survey) {
      if (survey.hasOwnProperty(key)) {
        resultText = `${resultText} ${key}: ${survey[key].length}`;
      }
    }
    results.innerText = resultText;
  }
});
