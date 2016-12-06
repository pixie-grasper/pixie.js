/* global pixie, svg */

let cache = null;

return function() {
  if (!cache) {
    cache = pixie.container();
    svg.appendChild(cache.pixie.element());
  }
  return cache;
};
