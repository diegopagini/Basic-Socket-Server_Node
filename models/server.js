/** @format */

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
	constructor() {
		this.app = express();
		this.port = 8080;
		// Http Server.
		this.server = http.createServer(this.app);
		// Sockets configuration.
		this.io = socketio(this.server, {});
	}

	middlewares() {
		// Public directory.
		this.app.use(express.static(path.resolve(__dirname, '../public')));
	}

	sockets() {
		new Sockets(this.io);
	}

	execute() {
		// Initialize middlewares.
		this.middlewares();
		// Initialize sockets.
		this.sockets();
		// Initialize server.
		this.server.listen(this.port, () => {
			console.log(`Server running on port: ${this.port}`);
		});
	}
}

module.exports = Server;
