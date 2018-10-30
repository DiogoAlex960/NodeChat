// Toma Coneção
var socket = io.connect('http://localhost:4000');

// Query DOM
var mensagem = document.getElementById('mensagem'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('enviar'),
      output = document.getElementById('output'),
      typing = document.getElementById('typing');

// Emitir mensagem
btn.addEventListener('click', function(){
    socket.emit('chat', {
        mensagem: mensagem.value,
        handle: handle.value
    });
    mensagem.value = "";
});

mensagem.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Trasnmitir mensagem
socket.on('chat', function(data){
    typing.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.mensagem + '</p>';
});

socket.on('typing', function(data){
    typing.innerHTML = '<p><em>' + data + ' esta a escrever...</em></p>';
});

// typing
socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
});
