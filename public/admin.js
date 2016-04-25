var socket = io();

var closePoll = document.querySelector('#close-poll');
var pollStatus = document.querySelector('#poll-status');
var currentId = window.location.href.split("admin/")[1];

closePoll.addEventListener('click', sendPollClosed);

function sendPollClosed() {
  socket.send('closePoll', {id: currentId});
}

socket.on('pollClosed', function(message) {
  closePoll.removeEventListener('click', sendPollClosed);
  pollStatus.innerText = "This poll has been closed";
});
