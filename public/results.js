var socket = io();

var results = document.querySelector('.results');

function showResults(message) {
  results.innerText = message.resultText;
}

socket.on('results', function (message) {
  showResults(message);
});
