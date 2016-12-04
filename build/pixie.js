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

  pixie.create = (function() {
    // /* global Pixie */

    return function(tag_name, name_space) {
      if (name_space) {
        return new Pixie([document.createElementNS(name_space, tag_name)]);
      }
      let tag;
      switch (tag_name.toLowerCase()) {
        case '!doctype':
        case 'a':
        case 'abbr':
        case 'address':
        case 'area':
        case 'article':
        case 'aside':
        case 'audio':
        case 'b':
        case 'base':
        case 'bdi':
        case 'bdo':
        case 'blockquote':
        case 'body':
        case 'br':
        case 'button':
        case 'canvas':
        case 'caption':
        case 'cite':
        case 'code':
        case 'col':
        case 'colgroup':
        case 'datalist':
        case 'dd':
        case 'del':
        case 'details':
        case 'dfn':
        case 'dialog':
        case 'div':
        case 'dl':
        case 'dt':
        case 'em':
        case 'embed':
        case 'dieldset':
        case 'figcaption':
        case 'figure':
        case 'footer':
        case 'form':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'head':
        case 'header':
        case 'hr':
        case 'html':
        case 'i':
        case 'iframe':
        case 'img':
        case 'input':
        case 'ins':
        case 'kbd':
        case 'keygen':
        case 'label':
        case 'legend':
        case 'li':
        case 'link':
        case 'main':
        case 'map':
        case 'mark':
        case 'menu':
        case 'menuitem':
        case 'meta':
        case 'meter':
        case 'nav':
        case 'noscript':
        case 'object':
        case 'ol':
        case 'optgroup':
        case 'option':
        case 'output':
        case 'p':
        case 'param':
        case 'pre':
        case 'progress':
        case 'q':
        case 'rp':
        case 'rt':
        case 'ruby':
        case 's':
        case 'samp':
        case 'script':
        case 'section':
        case 'select':
        case 'small':
        case 'source':
        case 'span':
        case 'strong':
        case 'style':
        case 'sub':
        case 'summary':
        case 'sup':
        case 'table':
        case 'tbody':
        case 'td':
        case 'textarea':
        case 'tfoot':
        case 'th':
        case 'thead':
        case 'time':
        case 'title':
        case 'tr':
        case 'track':
        case 'u':
        case 'ul':
        case 'var':
        case 'video':
        case 'wbr':
          tag = document.createElementNS('http://www.w3.org/1999/xhtml', tag_name);
          break;
        case 'altglyph':
        case 'altglyphdef':
        case 'altglyphitem':
        case 'animate':
        case 'animatecolor':
        case 'animatemotion':
        case 'animatetransform':
        case 'circle':
        case 'clippath':
        case 'color-profile':
        case 'cursor':
        case 'defs':
        case 'desc':
        case 'ellipse':
        case 'feblend':
        case 'fecolormatrix':
        case 'fecomponenttransfer':
        case 'fecomposite':
        case 'feconvolvematrix':
        case 'fediffuselighting':
        case 'fedisplacementmap':
        case 'fedistantlight':
        case 'feflood':
        case 'fefunca':
        case 'fefuncb':
        case 'fefuncg':
        case 'fefuncr':
        case 'fegaussianblur':
        case 'feimage':
        case 'femerge':
        case 'femergenode':
        case 'femorphology':
        case 'feoffset':
        case 'fepointlight':
        case 'fespecularlighting':
        case 'fespotlight':
        case 'fetile':
        case 'feturbulence':
        case 'filter':
        case 'font':
        case 'font-face':
        case 'font-face-format':
        case 'font-face-name':
        case 'font-face-src':
        case 'font-face-uri':
        case 'foreignobject':
        case 'g':
        case 'glyph':
        case 'glyphref':
        case 'hkern':
        case 'image':
        case 'line':
        case 'linergradient':
        case 'marker':
        case 'mask':
        case 'metadata':
        case 'missing-glyph':
        case 'mpath':
        case 'path':
        case 'pattern':
        case 'polygon':
        case 'polyline':
        case 'radialgradient':
        case 'rect':
        case 'set':
        case 'stop':
        case 'svg':
        case 'switch':
        case 'symbol':
        case 'text':
        case 'textpath':
        case 'tref':
        case 'tspan':
        case 'use':
        case 'view':
        case 'vkern':
          tag = document.createElementNS('http://www.w3.org/2000/svg', tag_name);
          break;
        default:
          tag = document.createElement(tag_name);
          break;
      }
      return new Pixie([tag]);
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

    this.__proto__.append = (function() {
      // /* global pixie, Pixie */

      return function(element) {
        if (this.length != 1) {
          pixie.error('invalid self to append.');
        } else if (element instanceof Pixie) {
          for (let i = 0; i < element.length; i++) {
            this[0].appendChild(element[i]);
          }
        }
        return this;
      };
    }).call(this);

    this.__proto__.text = (function() {
      return function(value) {
        if (value) {
          for (let i = 0; i < this.length; i++) {
            this[i].innerText = value;
          }
          return this;
        } else {
          return this[0].innerText;
        }
      };
    }).call(this);

    this.__proto__.css = (function() {
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
