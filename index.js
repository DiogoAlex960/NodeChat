var express = require('express');
var socket = require('socket.io');

// Ligação Servidor
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static ficheiros
app.use(express.static('public'));

// socket do stup
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Chat evento
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Typing ( a escrever .... )
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
