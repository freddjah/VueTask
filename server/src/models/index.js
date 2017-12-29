const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')

// Create a new database instance.
const db = {}

// Create a new sequelize instance.
const sequelizeInstance = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

// Scan through /models folder and import all the models.
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = sequelizeInstance.import(path.join(__dirname, file))
    db[model.name] = model
  })

// Add relations
db.User.hasMany(db.Task, { foreignKey: 'userId' })
db.Task.belongsTo(db.User, { foreignKey: 'userId' })

// Add Sequelize class and our own instance.
db.Sequelize = Sequelize
db.sequelizeInstance = sequelizeInstance

// Export the db instance. Whoop whoop!
module.exports = db
