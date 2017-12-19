const Task = require('../models/index')['Task']

module.exports = {
  async index (request, response) {
    try {
      const tasks = await Task.findAll({
        limit: 10
      })
      response.send(tasks)
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to fetch tasks.'
      })
    }
  },

  async store (request, response) {
    try {
      const task = await Task.create(request.body)
      const taskJSON = task.toJSON()
      response.send(taskJSON)
    } catch (error) {
      response.status(400).send({
        message: 'Something went wrong while trying to create a task.'
      })
    }
  },

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
  }
}
