import { rgbToHsl, hslToRgb, rgbToHex, hexToRgb, printHsl, printRgb } from '../../src/utils/color';

const testHsl = { h: 284, s: .42, l: .47 };
const testHslString = 'hsl(284, 42%, 47%)';
const testRgb = { r: 143, g: 69, b: 171 };
const testRgbString = 'rgb(143, 69, 171)';
const testHex = '#8f45ab';

test('rgb to hsl', () => {
    const hsl = rgbToHsl(testRgb.r, testRgb.g, testRgb.b);
    hsl.h = Math.round(hsl.h);
    hsl.s = parseFloat(hsl.s.toPrecision(2));
    hsl.l = parseFloat(hsl.l.toPrecision(2));
    expect(hsl).toEqual(testHsl);
})

test('hsl to rgb', () => {
    const rgb = hslToRgb(testHsl.h, testHsl.s, testHsl.l);
    const diff = Math.abs(rgb.r - testRgb.r);
    expect(diff).toBeLessThanOrEqual(1);
});

test('hsl to rgb', () => {
    const rgb = hslToRgb(testHsl.h, testHsl.s, testHsl.l);
    const diff = Math.abs(rgb.g - testRgb.g);
    expect(diff).toBeLessThanOrEqual(1);
});

test('hsl to rgb', () => {
    const rgb = hslToRgb(testHsl.h, testHsl.s, testHsl.l);
    const diff = Math.abs(rgb.b - testRgb.b);
    expect(diff).toBeLessThanOrEqual(1);
});

test('rgb to hex', () => {
    const hex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    expect(hex).toEqual(testHex);
})

test('hex to rgb', () => {
    const rgb = hexToRgb(testHex);
    expect(rgb).toEqual(testRgb);
})

test('print hsl', () => {
    const hslString = printHsl(testHsl.h, testHsl.s, testHsl.l);
    expect(hslString).toEqual(testHslString);
})

test('print rgb', () => {
    const rgbString = printRgb(testRgb.r, testRgb.g, testRgb.b);
    expect(rgbString).toEqual(testRgbString);
})