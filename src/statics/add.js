/* global root_node */

return function(object) {
  root_node().push(object);
  return this;
};
