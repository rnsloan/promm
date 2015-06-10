Promm =  function(fn) {
  var state = 'pending';
  var value;
  var deferred = [];

  function isAPromise(thing) {
    if (thing
        && (typeof thing === 'function' || typeof thing === 'object')
        && typeof thing.then === 'function') {
      return true
    } else {
      return false
    }
  }

  function resolve(newValue) {
    try {
      if( isAPromise(newValue) ) {
        newValue.then(resolve, reject);
        return;
      }
      state = 'resolved';
      value = newValue;

      if( deferred.length != 0 ) {
        handle(deferred.shift());
      }
    } catch(e) {
      reject(e);
    }
  }

  function reject(reason) {
    state = 'rejected';
    value = reason;

    if( deferred.length != 0 ) {
      handle(deferred.shift());
    }
  }

  function handle(handler) {
    if(state === 'pending') {
      deferred.push(handler);
      return;
    }

    setTimeout(function () {
      var handlerCallback;
      if(state === 'resolved') {
        handlerCallback = handler.onResolved;
      } else {
        handlerCallback = handler.onRejected;
      }

      if(!handlerCallback) {
        if(state === 'resolved') {
          handler.resolve(value);
        } else {
          handler.reject(value);
        }

        return;
      }

      var ret;
      try {
        ret = handlerCallback(value);
      } catch(e) {
        handler.reject(e);
        return;
      }

      handler.resolve(ret);
    },1)
  }

  this.then = function(onResolved, onRejected) {
    return new Promm(function(resolve, reject) {
      handle({
        onResolved: onResolved,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject
      });
    });
  };

  fn(resolve, reject);
}

module.exports = Promm