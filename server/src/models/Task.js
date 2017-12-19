module.exports = (dbConnection, DataTypes) => {
  const Task = dbConnection.define('Task', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })

  return Task
}
