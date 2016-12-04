/* global pixie */

const instance = this;

const set_style = function(target, attr, value) {
  if (value === '') {
    target.style[attr] = '';
  } else {
    target.style[attr] = value;
    if (target.style[attr] === '') {
      target.style[attr] = '-webkit-' + value;
      if (target.style[attr] === '') {
        target.style[attr] = '-moz-' + value;
        if (target.style[attr] === '') {
          target.style[attr] = '-o-' + value;
          if (target.style[attr] === '') {
            target.style[attr] = '-ms-' + value;
          }
        }
      }
    }
    if (target.style[attr] === '') {
      target.style['-webkit-' + attr] = value;
      target.style['-moz-' + attr] = value;
      target.style['-o-' + attr] = value;
      target.style['-ms-' + attr] = value;
    }
  }
};

return function(...args) {
  if (args.length == 1) {
    if (typeof args[0] === 'object') {
      for (let i = 0; i < instance.length; i++) {
        Object.keys(args[0]).forEach(function(key) {
          set_style(instance[i], key, args[0][key]);
        });
      }
    }
  } else {
    pixie.error('invalid arguments detected.');
  }
  return this;
};
