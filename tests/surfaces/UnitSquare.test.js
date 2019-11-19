import { UnitSquare } from '../../src/surfaces/UnitSquare';

test('point is out of bounds', () => {
    expect(UnitSquare.outOfBounds(1.1, 0)).toEqual(true);
})

test('point is out of bounds', () => {
    expect(UnitSquare.outOfBounds(0, 1.1)).toEqual(true);
})

test('point is out of bounds', () => {
    expect(UnitSquare.outOfBounds(-0.1, 0)).toEqual(true);
})

test('point is out of bounds', () => {
    expect(UnitSquare.outOfBounds(0, -0.1)).toEqual(true);
})

test('point is in bounds', () => {
    expect(UnitSquare.outOfBounds(0.9, 0)).toEqual(false);
})

test('point is in bounds', () => {
    expect(UnitSquare.outOfBounds(0, 0.9)).toEqual(false);
})

test('point is in bounds', () => {
    expect(UnitSquare.outOfBounds(0.1, 0)).toEqual(false);
})

test('point is in bounds', () => {
    expect(UnitSquare.outOfBounds(0, 0.1)).toEqual(false);
})