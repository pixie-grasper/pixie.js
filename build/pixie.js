// Authors: pixie-grasper
// License: MIT

window.$ = (function() {
  const Pixie = (function() {
    // /* global pixie */

    return function(...args) {
      pixie.extend(true, this.__proto__, pixie.prototype);
      this.__proto__.__initialize__.call(this, ...args);
      return;
    };
  })();

  const NODE_TYPE = (function() {
    return {
      OBJECT: Symbol('node::type::object'),
      CONTAINER: Symbol('node::type::container'),
      DRAWABLE: Symbol('node::type::drawable'),
      CIRCLE: Symbol('node::type::circle'),
      TEXT: Symbol('node::type::text'),
    };
  })();

  const ns = (function() {
    return {
      svg: 'http://www.w3.org/2000/svg',
      xhtml: 'http://www.w3.org/1999/xhtml',
    };
  })();

  let svg = (function() {
    return null;
  })();

  let root_node = (function() {
    // /* global pixie, svg */

    let cache = null;

    return function() {
      if (!cache) {
        cache = pixie.container();
        svg.appendChild(cache.pixie.element());
      }
      return cache;
    };
  })();

  let onload = (function() {
    let loaded = false;
    let onload = [];

    window.onload = function() {
      loaded = true;
      for (let i = 0; i < onload.length; i++) {
        onload[i]();
      }
      onload = null;
      return;
    };

    return function(func) {
      if (loaded) {
        func();
      } else {
        onload.push(func);
      }
    };
  })();

  let __initialize__ = (function() {
    // /* global svg: true, ns, NODE_TYPE */

    const hide_pixie_widget = function() {
      const pixie_widgets = document.getElementsByClassName('pixie-widget');
      for (let i = 0; i < pixie_widgets.length; i++) {
        pixie_widgets[i].style.display = 'none';
      }
      return;
    };

    const cleanup_body = function() {
      let node = document.body.firstChild;
      while (node !== null) {
        const next_node = node.nextSibling;
        if (node.nodeType === NODE_TYPE.ELEMENT_NODE) {
          const attr_style = node.attributes.getNamedItem('style');
          if (attr_style === null) {
            document.body.removeChild(node);
          } else {
            const div = document.createElement('div');
            div.setAttribute('style', attr_style.nodeValue);
            if (div.style.display !== 'none') {
              document.body.removeChild(node);
            }
          }
        } else {
          document.body.removeChild(node);
        }
        node = next_node;
      }
      return;
    };

    const fit_body = function() {
      document.body.style.margin = '0px';
      document.body.style.border = '0px';
      document.body.style.padding = '0px';
      return;
    };

    const create_box = function() {
      const width = document.body.scrollWidth;
      const height = document.body.scrollHeight;
      return {
        width: width,
        height: height,
        viewBox: '0 0 ' + width + ' ' + height,
      };
    };

    const add_pixie_canvas = function() {
      const pixie_canvas = document.createElement('div');
      document.body.appendChild(pixie_canvas);
      pixie_canvas.id = 'pixie';
      pixie_canvas.style.margin = '0px';
      pixie_canvas.style.border = '0px';
      pixie_canvas.style.padding = '0px';
      pixie_canvas.style.width = '100vw';
      pixie_canvas.style.height = '100vh';

      const box = create_box();
      svg = document.createElementNS(ns.svg, 'svg');
      svg.style.position = 'absolute';
      svg.setAttribute('width', box.width);
      svg.setAttribute('height', box.height);
      svg.setAttribute('viewBox', box.viewBox);
      svg.setAttribute('xmlns', ns.svg);
      pixie_canvas.appendChild(svg);
      return;
    };

    return function() {
      hide_pixie_widget();
      cleanup_body();
      fit_body();
      add_pixie_canvas();
      return;
    };
  })();

  let onresize = (function() {
    // /* global pixie, svg */

    const resize_svg = function() {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      const viewBox = '0 0 ' + width + ' ' + height;

      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      svg.setAttribute('viewBox', viewBox);
    };

    window.onresize = function() {
      if (svg) {
        resize_svg();
        resize_svg();
        pixie.show();
      }
      return;
    };

    return true;
  })();

  let pixie = (function() {
    // /* global pixie, onload */

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
  })();

  let true_y = (function() {
    return function(y) {
      return document.body.scrollHeight - y;
    };
  })();

  let true_x = (function() {
    return function(x) {
      return x;
    };
  })();

  pixie.object = (function() {
    // /* global Pixie, NODE_TYPE */

    return function() {
      let ret = {
        type: NODE_TYPE.OBJECT,
        kind: {
          object: true,
        },
        locate_element: null,
      };
      ret.pixie = new Pixie(ret);
      return ret;
    };
  })();

  pixie.container = (function() {
    // /* global pixie, NODE_TYPE, ns */

    return function() {
      return pixie.extend(true, pixie.object(), {
        type: NODE_TYPE.CONTAINER,
        kind: {
          container: true,
        },
        pixie: {
          children: [],
          attributes: {
            x: 0,
            y: 0,
          },
          element: (function() {
            let cache = null;

            return function() {
              if (!cache) {
                cache = document.createElementNS(ns.svg, 'g');
              }
              return cache;
            };
          })(),
        },
        locate_element: function(x, y) {
          const children = this.pixie.children;
          const tx = x + this.pixie.attributes.x;
          const ty = y + this.pixie.attributes.y;
          for (let i = 0; i < children.length; i++) {
            children[i].locate_element(tx, ty);
          }
          return this;
        },
        x: function(x) {
          if (x) {
            this.pixie.attributes.x = x;
            return this;
          } else {
            return this.pixie.attributes.x;
          }
        },
        y: function(y) {
          if (y) {
            this.pixie.attributes.y = y;
            return this;
          } else {
            return this.pixie.attributes.y;
          }
        },
        push: function(object) {
          this.pixie.children.push(object);
          this.pixie.element().appendChild(object.pixie.element());
          return this;
        },
      });
    };
  })();

  pixie.drawable = (function() {
    // /* global pixie, NODE_TYPE */

    return function() {
      return pixie.extend(true, pixie.object(), {
        type: NODE_TYPE.DRAWABLE,
        pixie: {
          attributes: {
            x: 0,
            y: 0,
            color: 'black',
          },
        },
        kind: {
          drawable: true,
        },
        x: function(x) {
          if (x) {
            this.pixie.attributes.x = x;
            return this;
          } else {
            return this.pixie.attributes.x;
          }
        },
        y: function(y) {
          if (y) {
            this.pixie.attributes.y = y;
            return this;
          } else {
            return this.pixie.attributes.y;
          }
        },
        color: function(color) {
          if (color) {
            this.pixie.attributes.color = color;
            return this;
          } else {
            return this.pixie.attributes.color;
          }
        },
      });
    };
  })();

  pixie.circle = (function() {
    // /* global pixie, NODE_TYPE, ns, true_x, true_y */

    return function() {
      return pixie.extend(true, pixie.drawable(), {
        type: NODE_TYPE.CIRCLE,
        kind: {
          circle: true,
        },
        pixie: {
          attributes: {
            radius: 0,
          },
          element: (function() {
            let cache = null;

            return function() {
              if (!cache) {
                cache = document.createElementNS(ns.svg, 'circle');
              }
              return cache;
            };
          })(),
        },
        locate_element: function(x, y) {
          const element = this.pixie.element();
          element.setAttribute('cx', true_x(x + this.pixie.attributes.x));
          element.setAttribute('cy', true_y(y + this.pixie.attributes.y));
          element.setAttribute('r', this.pixie.attributes.radius);
          element.setAttribute('fill', this.pixie.attributes.color);
          return this;
        },
        radius: function(radius) {
          if (radius) {
            this.pixie.attributes.radius = radius;
            return this;
          } else {
            return this.pixie.attributes.radius;
          }
        },
      });
    };
  })();

  pixie.show = (function() {
    // /* global root_node */

    return function() {
      root_node().locate_element(0, 0);
      return this;
    };
  })();

  pixie.add = (function() {
    // /* global root_node */

    return function(object) {
      root_node().push(object);
      return this;
    };
  })();

  pixie.extend = (function() {
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
  })();

  pixie.error = (function() {
    return function(message) {
      throw message;
    };
  })();

  pixie.prototype = {};

  pixie.prototype.__initialize__ = (function() {
    return function(wrapper) {
      this.wrapper = wrapper;

      this.element = function() {
        return null;
      };
      this.children = [];
      this.attributes = {};

      return this;
    };
  })();

  pixie(__initialize__);

  return pixie;
})();
