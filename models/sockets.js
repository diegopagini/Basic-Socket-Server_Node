/** @format */

class Sockets {
	constructor(io) {
		this.io = io;

		this.socketEvents();
	}

	socketEvents() {
		// On connection.
		this.io.on('connection', (socket) /** socket === client */ => {
			socket.on('msg-to-server', (data) => {
				// io === all users
				this.io.emit('msg-from-server', data);
			});
		});
	}
}

module.exports = Sockets;
