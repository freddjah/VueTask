const UserController = require('./controllers/UserController')

module.exports = (app) => {
  app.get('/users', UserController.index)
  app.post('/register', UserController.store)
  app.post('/login', UserController.authenticate)
}
