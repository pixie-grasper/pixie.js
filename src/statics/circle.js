/* global pixie, NODE_TYPE, ns, true_x, true_y */

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
