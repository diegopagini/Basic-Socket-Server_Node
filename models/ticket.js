/** @format */

const { v4: uuidv4 } = require('uuid');

class Ticket {
	constructor(number) {
		this.agent = null;
		this.desk = null;
		this.id = uuidv4();
		this.number = number;
	}
}

module.exports = Ticket;
