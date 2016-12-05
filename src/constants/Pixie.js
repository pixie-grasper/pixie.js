/* global pixie */

return function(...args) {
  (function(this_) {
    pixie.extend(true, this_.__proto__, pixie.prototype);
  })(this);

  this.__proto__.__initialize__.call(this, ...args);

  return;
};
