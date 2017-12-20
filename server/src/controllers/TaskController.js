const Task = require('../models/index')['Task']

module.exports = {
  async index (request, response) {
    try {
      const tasks = await Task.findAll({
        include: ['User'],
        limit: 10
      })
      response.send(tasks)
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to fetch tasks.'
      })
    }
  },

  /**
   * Creates a new task and returns it.
   * TODO: utilize request.user from AuthenticationPolicy middleware to set user of specific task.
   * @param {*} request
   * @param {*} response
   */
  async store (request, response) {
    try {
      if (!request.user) {
        response.status(401).send({
          message: 'Please login in order to add tasks.'
        })
      }

      const task = await Task.create(request.body)
      await task.setUser(request.user.id)

      const taskJSON = task.toJSON()
      response.send(taskJSON)
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to create a task.'
      })
    }
  },

  /**
   * Edits a task.
   * TODO: Make sure that it is correct user that is trying to edit task.
   * @param {*} request
   * @param {*} response
   */
  async edit (request, response) {
    try {
      const task = await Task.findById(request.params.id)

      task.text = request.body.text
      task.isDone = request.body.isDone

      await task.save()

      const taskJSON = task.toJSON()
      response.send(taskJSON)
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to edit the task.'
      })
    }
  },

  /**
   * Deletes a task.
   * TODO: Make sure that correct user is trying to delete task.
   * @param {*} request
   * @param {*} response
   */
  async destroy (request, response) {
    try {
      const task = await Task.findById(request.params.id)
      await task.destroy()

      response.send({
        message: 'Successfully deleted the task'
      })
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to delete the task.'
      })
    }
  },

  async show (request, response) {
    try {
      const task = await Task.findById(request.params.id)
      const taskJSON = task.toJSON()

      response.send({
        task: taskJSON
      })
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to show the task.'
      })
    }
  }
}
