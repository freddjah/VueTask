const jwt = require('jsonwebtoken')
const config = require('../config/config')

/**
 * Checks requests token and sets the request user header to the information stored within the token.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
module.exports = function (request, response, next) {
  if (request.body.token) {
    jwt.verify(request.body.token, config.jwtSecret, function (err, decrypted) {
      if (err) request.user = undefined
      request.user = decrypted
      next()
    })
  } else {
    request.user = undefined
    next()
  }
}
