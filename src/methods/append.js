/* global pixie, Pixie */

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
