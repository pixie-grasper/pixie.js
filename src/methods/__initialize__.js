return function(wrapper) {
  this.wrapper = wrapper;

  this.element = function() {
    return null;
  };
  this.children = [];
  this.attributes = {};

  return this;
};
