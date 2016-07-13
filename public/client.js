var socket = io();

var statusMessage = document.getElementById('status-message');

socket.on('statusMessage', function(message){
  statusMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', function(){
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function(votes){
  console.log(votes);
});
