const extend = function(recurse, target, source) {
  Object.keys(source).forEach(function(key) {
    if (recurse && typeof source[key] === 'object') {
      target[key] = extend(true, target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
};

return function(...args) {
  let recurse = false;
  if (typeof args[0] === 'boolean') {
    recurse = args[0];
    args.shift();
  }

  let target = args[0] || {};

  for (let i = 1; i < args.length; i++) {
    target = extend(recurse, target, args[i]);
  }

  return target;
};
