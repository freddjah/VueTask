const UserController = require('./controllers/UserController')
const TaskController = require('./controllers/TaskController')

const AuthenticationPolicy = require('./middleware/AuthenticationPolicy')
const TaskValidation = require('./middleware/TaskValidation')

module.exports = (app) => {
  app.get('/users', UserController.index)
  app.post('/register', UserController.store)
  app.post('/login', UserController.authenticate)
  app.get('/tasks', TaskController.index)
  app.post('/tasks', AuthenticationPolicy, TaskController.tasksSpecificUser)
  app.post('/tasks/add', [AuthenticationPolicy, TaskValidation], TaskController.store)
  app.patch('/tasks/:id', [AuthenticationPolicy, TaskValidation], TaskController.edit)
  app.delete('/tasks/:id', AuthenticationPolicy, TaskController.destroy)
  app.get('/tasks/:id', TaskController.show)
}
