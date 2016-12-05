/* global objects, objects_updated: true, CONTENTS_TYPE */

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
