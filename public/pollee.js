var socket = io();

var buttons = document.querySelectorAll('#choices button');
var buttonArea = document.querySelector('#choices');
var currentId = window.location.href.split("survey/")[1];
var yourVote = document.querySelector('#your-vote');
var choices = "";

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', {id: currentId, vote: this.innerText, socketId: socket.id});
    yourVote.innerText = `Your vote: ${this.innerText}`;
  });
}

for (var i = 0; i < buttons.length; i++) {
  choices = choices + `${i + 1}:` + buttons[i].innerText;
}

function closeThisPoll() {
  buttonArea.innerText = `Sorry, this survey has been closed. The choices were\n${choices}`;
}

socket.on('pollClosed', function (id) {
  if (currentId == id) {
    closeThisPoll();
  }
});
