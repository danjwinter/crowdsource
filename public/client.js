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

var ctx = document.getElementById("myChart").getContext("2d");


var myBarChart = new Chart(ctx).Bar(data, options);
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

socket.on('results', function (message) {
  showResults(message);
});
