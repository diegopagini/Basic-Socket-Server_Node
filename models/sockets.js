/** @format */

const BandList = require('./band-list');

class Sockets {
	constructor(io) {
		this.io = io;
		this.bandList = new BandList();
		// Listen socket events:
		this.socketEvents();
	}

	socketEvents() {
		// On connection.
		this.io.on('connection', (socket) /** socket === client */ => {
			console.log('client connected');

			//Emit to the client, all the current bands.
			socket.emit('current-bands', this.bandList.getBands());
		});
	}
}

module.exports = Sockets;
