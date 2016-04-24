var socket = io();

var results = document.querySelector('.results');

socket.on('results', function (message) {
  resultText = "";
  console.log(message);
  for (var key in message) {
  if (message.hasOwnProperty(key)) {
    resultText = `${resultText} ${key}: ${message[key].length}`;
  }
}
  results.innerText = resultText;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', {id: buttons[0].dataset.id, vote: this.innerText, socketId: socket.id});
  });
}
