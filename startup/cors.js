const cors = require('cors')

module.exports = function (options) {
  const whitelist = [ 'http://localhost:8080/' ] // /\.localhost\:8080$/
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Error: Not allowed by CORS'))
      }
    },
    credentials: true
  }
  // specify cors, according to mode
  if (options === 'no-cors' || process.env.NODE_ENV === 'development')
    return cors()

  return cors(corsOptions)
}
