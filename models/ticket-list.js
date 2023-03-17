/** @format */

const Ticket = require('./ticket');

class TicketList {
	constructor() {
		this.assigned = [];
		this.lastNumber = 0;
		this.pendings = [];
	}

	get nextNumber() {
		this.lastNumber++;
		return this.lastNumber;
	}

	get lastThirteen() {
		return this.assigned.slice(0, 13);
	}

	createTicket() {
		const newTicker = new Ticket(this.nextNumber);
		this.pendings.push(newTicker);
		return newTicker;
	}

	assignTicket(agent, desk) {
		if (this.pendings.length === 0) return null;

		const nextTicket = this.pendings.shift();
		nextTicket.agent = agent;
		nextTicket.desk = desk;
		this.assigned.unshift(nextTicket);

		return nextTicket;
	}
}

module.exports = TicketList;
