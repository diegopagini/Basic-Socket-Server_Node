/** @format */

// Express server
const express = require('express');
const app = express();
// Sockets server
const server = require('http').createServer(app);
// Socket configuration
const io = require('socket.io')(server);

// Public directory
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
	// socket === client

	socket.on('msg-to-server', (data) => {
		// io === all users
		io.emit('msg-from-server', data);
	});
});

server.listen(8080, () => {
	console.log('Server UP');
});
