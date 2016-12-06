/* global pixie, onload */

return function(...args) {
  if (args.length === 1) {
    const arg = args[0];
    if (typeof arg === 'function') {
      onload(arg);
    } else {
      pixie.error('TypeError: invalid argument detected.');
    }
  }
  return this;
};
