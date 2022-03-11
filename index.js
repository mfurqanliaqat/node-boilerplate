const winston = require('winston')
const express = require('express')

const app = express()

app.use(express.static('public'))

require('./startup/db')()
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/prod')(app)

app.get('/', (req, res) => {
  res.send('Node Live API | LIVE')
})

const port = process.env.PORT || 5000
app.listen(port, () => winston.info(`Listening on ${port}...`))
