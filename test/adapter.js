var Promise = require('../index')

exports.deferred = function () {
  var resolve, reject;
  var promise = new Promise(function (onResolve, onReject) {
    resolve = onResolve;
    reject = onReject;
  });
  return {
    promise: promise,
    resolve: resolve,
    reject: reject
  };
};
exports.resolved = Promise.resolve;
exports.rejected = Promise.reject;