import { UnitCircle } from '../../src/surfaces/UnitCircle';

test('point is out of bounds', () => {
    expect(UnitCircle.outOfBounds(1.1, 0)).toEqual(true);
})

test('point is out of bounds', () => {
    expect(UnitCircle.outOfBounds(0, 1.1)).toEqual(true);
})

test('point is out of bounds', () => {
    expect(UnitCircle.outOfBounds(-1.1, 0)).toEqual(true);
})

test('point is out of bounds', () => {
    expect(UnitCircle.outOfBounds(0, -1.1)).toEqual(true);
})

test('point is in bounds', () => {
    expect(UnitCircle.outOfBounds(0.9, 0)).toEqual(false);
})

test('point is in bounds', () => {
    expect(UnitCircle.outOfBounds(0, 0.9)).toEqual(false);
})

test('point is in bounds', () => {
    expect(UnitCircle.outOfBounds(-0.9, 0)).toEqual(false);
})

test('point is in bounds', () => {
    expect(UnitCircle.outOfBounds(0, -0.9)).toEqual(false);
})