const bcrypt = require('bcryptjs')

/**
 * Hashing a password using the Bcryptjs Package.
 * If a user haven't changed its password the function will not fire.
 * @param {User} user
 */
function hashPassword (user) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) return

  return bcrypt
    .hash(user.password, SALT_FACTOR)
    .then((hash) => user.setDataValue('password', hash))
}

/**
 * Defining the User model with the Sequelize connector.
 * @param {Sequelize} dbConnection
 * @param {DataTypes} DataTypes
 */
module.exports = (dbConnection, DataTypes) => {
  const User = dbConnection.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (submittedPassword) {
    return bcrypt.compare(submittedPassword, this.password)
  }

  return User
}
