import ColorData from '../src/color-data';


describe('ColorData class', () => {
  it('should accept name and R, G, and B values', () => {
    var cd = new ColorData('MyColor', 1, 2, 3);
    expect(cd.name).toEqual('MyColor');
    expect(cd.red).toEqual(1);
    expect(cd.green).toEqual(2);
    expect(cd.blue).toEqual(3);
  });

  it('should be able to take hex colors as well', () => {
    var cd = new ColorData('Red', '#f00');
    expect(cd.red).toEqual(255);
    expect(cd.green).toEqual(0);
    expect(cd.blue).toEqual(0);
  });

  describe('#setValue property', () => {
    it('should accept three numbers and assign to props', () => {
      var cd = new ColorData('MyColor', 0, 0, 0);
      cd.setValue(1, 2, 3);
      expect(cd.red).toEqual(1);
      expect(cd.green).toEqual(2);
      expect(cd.blue).toEqual(3);
    });

    it('should be able to take hex colors as well', () => {
      var cd = new ColorData('MyColor', 0, 0, 0);
      cd.setValue('#0ff');
      expect(cd.red).toEqual(0);
      expect(cd.green).toEqual(255);
      expect(cd.blue).toEqual(255);
    });
  });

  describe('#value property', () => {
    it('should return a hex version of the color', () => {
      var cd = new ColorData('MyColor', 255, 0, 0);
      expect(cd.value).toEqual('#f00');
    });

    it('should set the value given a hex value', () => {
      var cd = new ColorData('MyColor', 0, 0, 0);
      cd.value = '#f00';
      expect(cd.red).toEqual(255);
    });
  });

  describe('#registryValue property', () => {
    it('should return a Windows registry version of the value', () => {
      var cd = new ColorData('MyColor', 1, 2, 3);
      expect(cd.registryValue).toEqual('1,2,3');
    });
  });

  describe('#id property', () => {
    it('should return id-friendly version of the name', () => {
      var cd = new ColorData('MyColor', 1, 2, 3);
      expect(cd.id).toEqual('mycolor');

      cd.name = 'Foo bar';
      expect(cd.id).toEqual('foo_bar');

      cd.name = ' Middle ';
      expect(cd.id).toEqual('_middle_');
    });
  });

  describe('ColorData.fromArray function', () => {
    it('maps color values to PuTTY names', () => {
      var colors = ['#fff', '#000'];
      var mapped = ColorData.fromArray(colors);

      expect(mapped.length).toEqual(2);
      expect(mapped[0].name).toEqual('Default Foreground');
      expect(mapped[0].value).toEqual('#fff');
      expect(mapped[1].name).toEqual('Default Bold Foreground');
      expect(mapped[1].value).toEqual('#000');
    });
  });
});
