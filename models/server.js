/** @format */

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		// Http Server.
		this.server = http.createServer(this.app);
		// Sockets configuration.
		this.io = socketio(this.server, {});
		this.sockets = new Sockets(this.io);
	}

	middlewares() {
		// Public directory.
		this.app.use(express.static(path.resolve(__dirname, '../public')));
		// CORS.
		this.app.use(cors());
		// Get tickets.
		this.app.get('/tickets', (req, res) => {
			return res.json({
				ok: true,
				tickets: this.sockets.ticketList.lastThirteen,
			});
		});
	}

	execute() {
		// Initialize middlewares.
		this.middlewares();
		// Initialize server.
		this.server.listen(this.port, () => {
			console.log(`Server running on port: ${this.port}`);
		});
	}
}

module.exports = Server;
