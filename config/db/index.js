require('dotenv').config({
	path: `./env-files/${process.env.NODE_ENV || 'development'}.env`,
});
var mongoose = require('mongoose');
const debug = require('debug')('express:db');

mongoose.Promise = global.Promise;
debug("MONGO LINK", process.env.MONGO_URL);
var connection = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

connection.then(db => {
	debug(
		`Successfully connected to ${process.env.MONGO_URL} MongoDB cluster in ${
		process.env.NODE_ENV
		} mode.`,
	);
	return db;
}).catch(err => {
	if (err.message.code === 'ETIMEDOUT') {
		debug('Attempting to re-establish database connection.');
		mongoose.connect(process.env.MONGO_URL);
	} else {
		debug('Error while attempting to connect to database:');
		debug(err);
	}
});

// export default connection;
