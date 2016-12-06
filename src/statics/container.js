/* global pixie, NODE_TYPE, ns */

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
