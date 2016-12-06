/* global svg: true, ns, NODE_TYPE */

const hide_pixie_widget = function() {
  const pixie_widgets = document.getElementsByClassName('pixie-widget');
  for (let i = 0; i < pixie_widgets.length; i++) {
    pixie_widgets[i].style.display = 'none';
  }
  return;
};

const cleanup_body = function() {
  let node = document.body.firstChild;
  while (node !== null) {
    const next_node = node.nextSibling;
    if (node.nodeType === NODE_TYPE.ELEMENT_NODE) {
      const attr_style = node.attributes.getNamedItem('style');
      if (attr_style === null) {
        document.body.removeChild(node);
      } else {
        const div = document.createElement('div');
        div.setAttribute('style', attr_style.nodeValue);
        if (div.style.display !== 'none') {
          document.body.removeChild(node);
        }
      }
    } else {
      document.body.removeChild(node);
    }
    node = next_node;
  }
  return;
};

const fit_body = function() {
  document.body.style.margin = '0px';
  document.body.style.border = '0px';
  document.body.style.padding = '0px';
  return;
};

const create_box = function() {
  const width = document.body.scrollWidth;
  const height = document.body.scrollHeight;
  return {
    width: width,
    height: height,
    viewBox: '0 0 ' + width + ' ' + height,
  };
};

const add_pixie_canvas = function() {
  const pixie_canvas = document.createElement('div');
  document.body.appendChild(pixie_canvas);
  pixie_canvas.id = 'pixie';
  pixie_canvas.style.margin = '0px';
  pixie_canvas.style.border = '0px';
  pixie_canvas.style.padding = '0px';
  pixie_canvas.style.width = '100vw';
  pixie_canvas.style.height = '100vh';

  const box = create_box();
  svg = document.createElementNS(ns.svg, 'svg');
  svg.style.position = 'absolute';
  svg.setAttribute('width', box.width);
  svg.setAttribute('height', box.height);
  svg.setAttribute('viewBox', box.viewBox);
  svg.setAttribute('xmlns', ns.svg);
  pixie_canvas.appendChild(svg);
  return;
};

return function() {
  hide_pixie_widget();
  cleanup_body();
  fit_body();
  add_pixie_canvas();
  return;
};
