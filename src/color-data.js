import rgba from 'rgba-convert';

const COLOR_NAMES = [
  'Default Foreground',
  'Default Bold Foreground',
  'Default Background',
  'Default Bold Background',
  'Cursor Text',
  'Cursor Color',
  'ANSI Black',
  'ANSI Black Bold',
  'ANSI Red',
  'ANSI Red Bold',
  'ANSI Green',
  'ANSI Green Bold',
  'ANSI Yellow',
  'ANSI Yellow Bold',
  'ANSI Blue',
  'ANSI Blue Bold',
  'ANSI Magenta',
  'ANSI Magenta Bold',
  'ANSI Cyan',
  'ANSI Cyan Bold',
  'ANSI White',
  'ANSI White Bold'
];

const DEFAULT_COLORS = [
  "#bdb7a8",
  "#fff",
  "#171b1e",
  "#283539",
  "#171b1e",
  "#0ff",
  "#171b1e",
  "#313940",
  "#a41717",
  "#de130e",
  "#66760c",
  "#76b71e",
  "#b78d00",
  "#dfc400",
  "#1765bb",
  "#1d9efe",
  "#b32b79",
  "#e214f3",
  "#057aa0",
  "#1dabf8",
  "#bdb7a8",
  "#fff"
];

class ColorData {
  constructor(name, r, g, b) {
    this.name = name;
    this.setValue(r, g, b);
  }

  setValue(r, g, b) {
    if (g === undefined) {
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
    return `${ this.red },${ this.green },${ this.blue }`;
  }

  get id() {
    return this.name.toLowerCase().replace(/\s+/g, '_');
  }
}

ColorData.fromArray = function (colors) {
  return colors.map(function (color, idx) {
    return new ColorData(COLOR_NAMES[idx], color);
  });
};

export { COLOR_NAMES, DEFAULT_COLORS };
export default ColorData;
