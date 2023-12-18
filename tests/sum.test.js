/* eslint-disable no-undef */
const { sum } = require('./sum');

describe('Sum', () => {
  test('of 2 + 2 shoud be 4', () => {
    const res = sum(2, 2);

    expect(res).toBe(4);
  });

  test('without params should be error', () => {
    expect(() => sum()).toThrow();
    expect(() => sum('', '')).toThrow();
    expect(() => sum('')).toThrow();
    expect(() => sum(12)).toThrow();
    expect(() => sum('12', 12)).toThrow();
    expect(() => sum('12', 12)).toThrow();
    expect(() => sum([12], 123)).toThrow();
    expect(() => sum([], [])).toThrow();
  });

  test('of negative numbers shoud be ', () => {
    const res = sum(-1, -1);
    expect(res).toEqual(-2);
  });
});
