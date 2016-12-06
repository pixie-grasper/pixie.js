/* global Pixie, NODE_TYPE */

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
