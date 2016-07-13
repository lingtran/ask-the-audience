var socket = io();

var statusMessage = document.getElementById('status-message');

var votesCast = document.getElementById('votes');

socket.on('statusMessage', function(message){
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', function(){
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function(votes){
  console.log(votes);

  displayVotesCast(votes);
});

function displayVotesCast(votes){
  var keys = Object.keys(votes);
  keys.map(function(key){
            var dataTag = document.getElementById('vote-' + key);
            dataTag.innerHTML = votes[key] + " vote(s)";
          });
}
