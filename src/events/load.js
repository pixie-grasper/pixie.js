/* global loaded: true, onload */

return function() {
  loaded = true;

  for (let i = 0; i < onload.length; i++) {
    onload[i]();
  }
};
