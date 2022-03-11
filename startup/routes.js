const cors = require('./cors') // app middleware: cors() | cors('no-cors')
// const auth = require('../routes/auth')
// const error = require('../middleware/error')

const apiPath = '/api/v1'
module.exports = function (app) {
  app.use(`${apiPath}/tests`, cors(), require('../routes/tests'))
  // app.use(error)
}
