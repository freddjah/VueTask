const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const AuthenticationPolicy = require('./middleware/AuthenticationPolicy')

module.exports = (app) => {
  app.get('/users', UserController.index)
  app.post('/register', UserController.store)
  app.post('/login', UserController.authenticate)
  app.get('/tasks', TaskController.index)
  app.post('/tasks/add', AuthenticationPolicy, TaskController.store)
  app.patch('/tasks/:id', AuthenticationPolicy, TaskController.edit)
  app.delete('/tasks/:id', AuthenticationPolicy, TaskController.destroy)
  app.get('/tasks/:id', TaskController.show)
}
