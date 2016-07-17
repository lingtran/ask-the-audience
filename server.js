const http = require('http');
const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)
              .listen(port, function(){
                console.log('Listening on port' + port + '.');
              });

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function(socket){
  var votes = {};

  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.emit('userVote', function(channel, message){

  })

  socket.on('message', function(channel, message){
    console.log(channel, message);

    if(channel === 'voteCast'){
      votes[socket.id] = message;
      socket.emit('voteCount', countVotes(votes));
      })
    }

    // Emit a event to the user's individual socket that lets them know when their vote has been cast (and what vote they cast).
    // if(channel === 'recentVoteCast'){
    //   votes[socket.id] = message
    //   socket.emit('recentVoteCast', function(votes){
    //
    //   })
    // }
  });

  socket.on('disconnect', function(){
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });

});

let voteCount = {
  A: 0,
  B: 0,
  C: 0,
  D: 0
};

function countVotes(votes){
  // TODO: write better implementation of this function using lodash

  for(var vote in votes){
    voteCount[votes[vote]]++
  }
  return voteCount;
}

module.exports = server;
