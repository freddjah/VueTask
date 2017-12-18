module.exports = (app) => {
  app.get('/', async function (request, response) {
    response.status(404).send({message: 'It\'s alive!'})
  })
}
