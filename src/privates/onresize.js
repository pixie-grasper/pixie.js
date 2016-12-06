/* global pixie, svg */

const resize_svg = function() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const viewBox = '0 0 ' + width + ' ' + height;

  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', viewBox);
};

window.onresize = function() {
  if (svg) {
    resize_svg();
    resize_svg();
    pixie.show();
  }
  return;
};

return true;
