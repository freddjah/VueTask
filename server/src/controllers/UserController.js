const User = require('../models/index')['User']

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
      const userJSON = user.toJSON()
      response.send({
        user: userJSON
      })
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to create a new user.'
      })
    }
  }
}
