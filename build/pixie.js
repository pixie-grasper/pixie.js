// Authors: pixie-grasper
// License: MIT

window.$ = (function() {
  const Pixie = (function() {
    // /* global pixie */

    return function(...args) {
      (function(this_) {
        pixie.extend(true, this_.__proto__, pixie.prototype);
      })(this);

      this.__proto__.__initialize__.call(this, ...args);

      return;
    };
  })();

  const CONTENTS_TYPE = (function() {
    return {
      TEXT: Symbol('contents::type::text'),
    };
  })();

  let objects = (function() {
    return [];
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

  let pixie = (function() {
    // /* global onload */

    return function(...args) {
      if (args.length === 1) {
        const arg = args[0];
        if (typeof arg === 'function') {
          onload(arg);
        }
      }
      return this;
    };
  })();

  let objects_updated = (function() {
    return false;
  })();

  pixie.text = (function() {
    // /* global CONTENTS_TYPE, Pixie */

    return function(text) {
      return new Pixie(CONTENTS_TYPE.TEXT, text);
    };
  })();

  pixie.show = (function() {
    // /* global objects, objects_updated: true, CONTENTS_TYPE */

    const make_empty = function(element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      return;
    };

    let cached = false;

    const calc_box_size = function(element) {
      const regex = /^([0-9.]+)/;
      const width_spacer = [
        'marginLeft',
        'marginRight',
        'borderLeft',
        'borderRight',
        'paddingLeft',
        'paddingRight',
      ];
      const height_spacer = [
        'marginTop',
        'marginBottom',
        'borderTop',
        'borderBottom',
        'paddingTop',
        'paddingBottom',
      ];
      let match;
      let width = element.scrollWidth;
      for (let i = 0; i < width_spacer.length; i++) {
        if ((match = regex.exec(element.style[width_spacer[i]])) !== null) {
          width -= match[1];
        } else if (width_spacer[i].match(/^margin/)) {
          width -= 8;
        }
      }
      let height = element.scrollHeight;
      for (let i = 0; i < width_spacer.length; i++) {
        if ((match = regex.exec(element.style[height_spacer[i]])) !== null) {
          height -= match[1];
        } else if (height_spacer[i].match(/^margin/)) {
          height -= 8;
        }
      }
      return {
        width: width,
        height: height,
        viewBox: '0 0 ' + width + ' ' + height,
      };
    };

    const render = function() {
      make_empty(document.body);
      const svgns = 'http://www.w3.org/2000/svg';
      const box_size = calc_box_size(document.body);
      const div = document.createElement('div');
      const svg = document.createElementNS(svgns, 'svg');
      div.appendChild(svg);
      div.style.width = box_size.width + 'px';
      div.style.height = box_size.height + 'px';
      document.body.appendChild(div);
      svg.setAttribute('xmlns', svgns);
      svg.setAttribute('viewBox', box_size.viewBox);
      svg.style.width = box_size.width;
      svg.style.height = box_size.height;
      svg.style.position = 'absolute';
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        switch (object.contents_type) {
          case CONTENTS_TYPE.TEXT:
            object.element.setAttribute('x', object.values.x || '0');
            object.element.setAttribute('y', object.values.y || '0');
            svg.appendChild(object.element);
            break;
        }
      }
      return;
    };

    const show = function(objects) {

    };

    return function() {
      if (objects_updated) {
        objects_updated = false;
        cached = false;
      }
      if (!cached) {
        render();
      }
      show(objects);
      return this;
    };
  })();

  pixie.add = (function() {
    // /* global Pixie, objects: true, objects_updated: true */

    return function(...args) {
      if (args.length === 1) {
        const pixie_object = args[0];
        if (pixie_object instanceof Pixie) {
          objects.push(pixie_object);
        } else if (pixie_object instanceof Array) {
          objects = objects.concat(pixie_object);
        }
      } else {
        objects = objects.concat(args);
      }
      objects_updated = true;
      return this;
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

  pixie.prototype = {};

  pixie.prototype.__initialize__ = (function() {
    // /* global CONTENTS_TYPE */

    const svgns = 'http://www.w3.org/2000/svg';

    return function(contents_type, contents) {
      this.contents_type = contents_type;
      this.values = {};

      switch (contents_type) {
        case CONTENTS_TYPE.TEXT:
          this.element = document.createElementNS(svgns, 'text');
          this.element.style['-webkit-user-select'] = 'none';
          this.element.style['cursor'] = 'default';
          this.element.setAttribute('dominant-baseline', 'text-before-edge');
          this.text_node = document.createTextNode(contents);
          this.element.appendChild(this.text_node);
          break;
      }

      return this;
    };
  })();

  pixie.prototype.x = (function() {
    return function(value) {
      this.values.x = value;
      return this;
    };
  })();

  pixie.prototype.y = (function() {
    return function(value) {
      this.values.y = value;
      return this;
    };
  })();

  return pixie;
})();
