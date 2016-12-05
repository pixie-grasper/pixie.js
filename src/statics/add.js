/* global Pixie, objects: true, objects_updated: true */

return function(...args) {
  if (args.length === 1) {
    const pixie_object = args[0];
    if (pixie_object instanceof Pixie) {
      objects.push(pixie_object);
    } else if (pixie_object instanceof Array) {
      objects = objects.concat(pixie_object);
    }
  } else {
    objects = objects.concat(args);
  }
  objects_updated = true;
  return this;
};
