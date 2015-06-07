var Promise = require('../index')

exports.resolved = Promise.resolve

exports.rejected = Promise.reject

exports.deferred = function () {
  return new Promise()
}