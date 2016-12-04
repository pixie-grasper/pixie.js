// Authors: pixie-grasper
// License: MIT

window.$ = (function() {
  let onload = (function() {
    return [];
  })();

  let pixie = (function() {
    // /* global pixie, Pixie */

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
          // /* global loaded, onload */
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
  })();

  let loaded = (function() {
    return false;
  })();

  window.onload = (function() {
    // /* global loaded: true, onload */

    return function() {
      loaded = true;

      for (let i = 0; i < onload.length; i++) {
        onload[i]();
      }
    };
  })();

  pixie.extend = (function() {
    const extend = function(recurse, target, source) {
      Object.keys(source).forEach(function(key) {
        if (recurse && typeof source[key] === 'object') {
          target[key] = extend(true, target[key], source[key]);
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
  })();

  pixie.error = (function() {
    return function(message) {
      throw message;
    };
  })();

  const Pixie = function(elements) {
    (function(this_) {
      Object.keys(elements).forEach(function(key) {
        this_[key] = elements[key];
      });
    })(this);
    this.length = elements.length;

    this.css = (function() {
      // /* global pixie */

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
    }).call(this);
  };

  return pixie;
})();
