const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const config = require('./config/config')

const app = express()
const dbConnection = require('./models').sequelizeInstance

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

dbConnection.sync()
  .then(() => {
    app.listen(config.port)
    console.log('-- We have a lift-off! --')
  })
