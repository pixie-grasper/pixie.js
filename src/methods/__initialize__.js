/* global CONTENTS_TYPE */

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
