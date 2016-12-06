/* global pixie */

return function(...args) {
  pixie.extend(true, this.__proto__, pixie.prototype);
  this.__proto__.__initialize__.call(this, ...args);
  return;
};
