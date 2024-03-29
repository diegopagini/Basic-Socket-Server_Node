/** @format */

const BandList = require('./band-list');
const TicketList = require('./ticket-list');

class Sockets {
	constructor(io) {
		this.io = io;
		this.bandList = new BandList();
		this.ticketList = new TicketList();
		// Listen socket events

		this.socketEvents();
	}

	socketEvents() {
		// On connection.
		this.io.on('connection', (socket) /** socket === client */ => {
			console.log('client connected');

			// Emit to the client, all the current bands.
			socket.emit('current-bands', this.bandList.getBands());

			// On band voted.
			socket.on('vote-band', (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// On band deleted.
			socket.on('delete-band', (id) => {
				this.bandList.removeBand(id);
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// On band name changed.
			socket.on('change-name-band', ({ id, name }) => {
				this.bandList.changeBandName(id, name);
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// On band created.
			socket.on('create-band', ({ name }) => {
				this.bandList.addBand(name);
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// On request ticket.
			socket.on('request-ticket', (_, callback) => {
				callback(this.ticketList.createTicket());
			});

			// On next ticket.
			socket.on('next-ticket', ({ agent, desk }, callback) => {
				const ticket = this.ticketList.assignTicket(agent, desk);
				callback(ticket);

				this.io.emit('ticket-assigned', this.ticketList.lastThirteen);
			});
		});
	}
}

module.exports = Sockets;
