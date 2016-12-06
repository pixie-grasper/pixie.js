/* global pixie, NODE_TYPE */

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
  });
};
