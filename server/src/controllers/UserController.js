const User = require('../models/index')['User']
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function createToken (user) {
  const userJSON = user.toJSON()
  const token = jwt.sign(userJSON, config.jwtSecret)
  return token
}

module.exports = {

  /**
   * Fetches all the users.
   * @param request
   * @param response
   */
  async index (request, response) {
    try {
      const users = await User.findAll({
        limit: 10
      })
      response.send(users)
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to fetch users.'
      })
    }
  },

  /**
   * Creates a new user and returns the new user as a JSON object.
   * @param request
   * @param response
   */
  async store (request, response) {
    try {
      const user = await User.create(request.body)
      const token = createToken(user)
      response.send({
        username: user.username,
        token: token
      })
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to create a new user.'
      })
    }
  },

  /**
   * Authenticates the user and returns the user information.
   * TODO: Implement token to be returned.
   * @param request
   * @param response
   */
  async authenticate (request, response) {
    try {
      const {username, password} = request.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })

      if (!user) {
        response.status(403).send({
          message: 'The login information was incorrect'
        })
      }

      const validPassword = await user.comparePassword(password)

      if (!validPassword) {
        response.status(403).send({
          message: 'The login information was incorrect'
        })
      } else {
        const token = createToken(user)
        response.send({
          username: user.username,
          token: token
        })
      }
    } catch (error) {
      response.status(500).send({
        message: 'An error has occurred while trying to log in.',
        error: error
      })
    }
  }
}
