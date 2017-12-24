'use strict'

const winston = require('winston')

const console_transport = {
	console: {
		colorize: true,
		prettyPrint: true,
		stringify: true,
		depth: 1,
		timestamp: true,
		level: 'debug'
	}
}

winston.loggers.add('main', console_transport)
winston.loggers.add('dev', console_transport)

module.exports = winston.loggers