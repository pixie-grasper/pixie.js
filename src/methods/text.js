return function(value) {
  if (value) {
    for (let i = 0; i < this.length; i++) {
      this[i].innerText = value;
    }
    return this;
  } else {
    return this[0].innerText;
  }
};
