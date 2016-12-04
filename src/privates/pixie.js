/* global pixie, Pixie */

const all_tags = function(root) {
  let ret = [];
  for (let i = 0; i < root.children.length; i++) {
    ret.push(root.children[i]);
    if (root.children[i].firstChild) {
      ret.concat(all_tags(root.children[i]));
    }
  }
  return ret;
};

const find_elements = function(hash) {
  let tmp;
  if (hash.id) {
    tmp = document.getElementById(hash.id);
    if (tmp !== null) {
      return [tmp];
    } else {
      return [];
    }
  } else if (hash.class) {
    tmp = document.getElementsByClassName(hash.class);
  } else if (hash.tagName) {
    tmp = document.getElementsByTagName(hash.tagName);
  } else {
    tmp = all_tags(document);
  }
  let disabled = [];
  Object.keys(hash).forEach(function(key) {
    if (key != 'id' && key != 'class' && key != 'tagName') {
      for (let i = 0; i < tmp.length; i++) {
        if (!disabled[i]) {
          if (tmp[i].getAttribute(key) != hash[key]) {
            disabled[i] = true;
          }
        }
      }
    }
  });
  let ret = [];
  for (let i = 0; i < tmp.length; i++) {
    if (!disabled[i]) {
      ret.push(tmp[i]);
    }
  }
  return ret;
};

return function(...args) {
  if (args.length == 1) {
    if (typeof args[0] === 'function') {
      /* global loaded, onload */
      if (loaded) {
        args[0]();
      } else {
        onload.push(args[0]);
      }
    } else if (typeof args[0] === 'object') {
      const ctor = args[0].__proto__.constructor;
      if (ctor.name === 'HTMLCollection') {
        return new Pixie(args[0]);
      } else if (ctor.name.match(/^HTML/)) {
        return new Pixie(args);
      } else {
        return new Pixie(find_elements(args[0]));
      }
    } else if (typeof args[0] === 'string') {
      return new Pixie(document.querySelectorAll(args[0]));
    } else {
      pixie.error('invalid argument detected.');
    }
  } else {
    pixie.error('invalid arguments detected.');
  }
  return this;
};
