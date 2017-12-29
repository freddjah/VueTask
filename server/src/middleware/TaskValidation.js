const validator = require('validator')

module.exports = (request, response, next) => {
  let errors = {}
  let foundError = false

  if (request.body.text === undefined || validator.isEmpty(escape(request.body.text))) {
    errors.textSubmitted = {
      value: !!request.body.text,
      message: 'No input was given in text field.'
    }
    foundError = true
  }

  if (!validator.isAscii(escape(request.body.text))) {
    errors.textIsAscii = {
      value: validator.isAscii(escape(request.body.text)),
      message: 'The text given was not in regular characters (letters, numbers).'
    }
    foundError = true
  }

  // If isDone has been submitted, check that it is boolean.
  if (request.body.isDone !== undefined) {
    if (!validator.isBoolean(escape(request.body.isDone.toString()))) {
      errors.isDoneIsBoolean = {
        value: validator.isBoolean(escape(request.body.isDone.toString())),
        message: 'The value stating if the task has been completed is not a boolean.'
      }
      foundError = true
    }
  }

  if (foundError) {
    response.status(400).send({
      errors: errors
    })
  } else {
    next()
  }
}
