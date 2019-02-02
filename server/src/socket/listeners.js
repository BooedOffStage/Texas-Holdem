'use strict';

const table = {
  name: '',
  players: [],
};

/**
 * Socket listeners.
 */
module.exports = (socket, io) => {
  console.log('connection', socket.id);

  console.log('table:', table);


  // Emit a player's message to everyone in the chat
  socket.on('send_msg', (data) => {
    console.log('chat message data:', data);
    io.emit('msg', data);
  });


  // Emit a message when player joins the table
  socket.on('join_table', (player) => {
    table.players.push({
      username: player.username,
      count: player.count,
      hc1: '9H',
      hc2: '8C',
    });
    console.log('add:', table);
    io.emit('update_table', table);
    io.emit('msg', { msg: `${player.username} has joined the table` });
  });


  // Emit a message when player leaves the table
  socket.on('leave_table', (username) => {
    console.log('remove this guy:', username);
    table.players = table.players.filter(player => player.username !== username);

    console.log('remove:', table);

    io.emit('update_table', table);
    io.emit('msg', { msg: `${username} has left the table` });
  });
};
