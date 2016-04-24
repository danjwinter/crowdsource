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

function closeThisPoll() {
  buttonArea.innerText = "Sorry, this survey has been closed";
}

socket.on('pollClosed', function (id) {
  if (currentId == id) {
    closeThisPoll();
  }
});

function showResults(message) {
  results.innerText = message.resultText;
}

socket.on('results', function (message) {
  showResults(message);
});
