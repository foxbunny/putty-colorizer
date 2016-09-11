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
  'rgb(131, 148, 150)',
  'rgb(147, 161, 161)',
  'rgb(0, 43, 54)',
  'rgb(7, 54, 66)',
  'rgb(0, 43, 54)',
  'rgb(238, 232, 213)',
  'rgb(7, 54, 66)',
  'rgb(0, 43, 56)',
  'rgb(220, 50, 47)',
  'rgb(203, 75, 22)',
  'rgb(133, 153, 0)',
  'rgb(88, 110, 117)',
  'rgb(181, 137, 0)',
  'rgb(101, 123, 131)',
  'rgb(38, 139, 210)',
  'rgb(131, 148, 150)',
  'rgb(211, 54, 130)',
  'rgb(108, 113, 196)',
  'rgb(42, 161, 152)',
  'rgb(147, 161, 161)',
  'rgb(238, 232, 213)',
  'rgb(253, 246, 227)'
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
    return `(${ this.red },${ this.green },${ this.blue })`;
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
