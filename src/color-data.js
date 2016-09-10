import rgba from 'rgba-convert';

class ColorData {
  constructor(name, r, g, b) {
    this.name = name;
    this.setValue(r, g, b);
  }

  setValue(r, g, b) {
    if (arguments.length === 1) {
      [r, g, b] = rgba(r);
    }
    this.red = r;
    this.green = g;
    this.blue = b;
    this.colorObj = {r: this.red, g: this.green, b: this.blue};
  }

  set value(val) {
    this.setValue(val);
  }

  get value() {
    return rgba.hex(this.colorObj);
  }

  get registryValue() {
    return `(${ this.red },${ this.green },${ this.blue })`;
  }

  get id() {
    return this.name.toLowerCase().replace(/\s+/g, '_');
  }
}

export default ColorData;
