var socket = io();

var results = document.querySelector('.results');

var buttons = document.querySelectorAll('#choices button');
var buttonArea = document.querySelector('#choices');
var currentId = window.location.href.split("survey/")[1];

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', {id: currentId, vote: this.innerText, socketId: socket.id});
  });
}

socket.on('pollClosed', function (id) {
  console.log("received poll closed", currentId === id)
  if (currentId === id) {
    buttonArea.innerText = "Sorry, this survey has been closed";
  }
});

socket.on('results', function (message) {
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
