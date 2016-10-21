const express = require('express');
const PORT = 3002;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const CONNECTION_TIMEOUT = 10000;
const players = {};


app.use( express.static("static") );

io.on("connection", function(socket){
  console.log("NEW PLAYER CONNECTED: ");
  console.log(socket.id);
  let playerCount = 0;
  for(socketId in players){
    if (new Date().getTime() - players[socketId].lastMove > CONNECTION_TIMEOUT){
      delete players[socketId];
    }
    else {
      playerCount++;
    }
  }
  if(playerCount < 2){

  players[socket.id] = {x:300, y:100, lastMove: new Date().getTime()};
  socket.on("player_moved", function(data){
    players[socket.id] = data;
    socket.broadcast.emit("player_moved", data);

    });
  }
});

app.get( '/', function(req,res){
  res.sendFile( _dirname + "/static/index.html" );
});

http.listen( PORT, ()=>console.log("Server Listening on port "+PORT) );
