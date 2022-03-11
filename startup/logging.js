const winston = require('winston')
require('express-async-errors')

const infoFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`),
  )

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({  }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }))
  
  process.on('unhandledRejection', (ex) => {
    throw ex
  })
  
  winston.add(new winston.transports.File({
    filename: 'error.log',
    level: 'error',
    format: winston.format.json()
  })),
  winston.add(new winston.transports.Console({ format: infoFormat}))
  winston.add(new winston.transports.File({ filename: 'logfile.log' }))
}