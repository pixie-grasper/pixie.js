let loaded = false;
let onload = [];

window.onload = function() {
  loaded = true;
  for (let i = 0; i < onload.length; i++) {
    onload[i]();
  }
  onload = null;
  return;
};

return function(func) {
  if (loaded) {
    func();
  } else {
    onload.push(func);
  }
};
