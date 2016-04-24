var socket = io();

var closePoll = document.querySelector('#close-poll');
var pollStatus = document.querySelector('#poll-status');
var currentId = window.location.href.split("admin/")[1];

closePoll.addEventListener('click', function () {
  socket.send('closePoll', {id: currentId});
});

socket.on('pollClosed', function(message) {
  pollStatus.innerText = "This poll has been closed";
});
