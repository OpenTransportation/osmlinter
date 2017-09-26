const findAngle = require('../..').findAngle

test('utils -- findAngle', () => {
  expect(findAngle([5, 5], [5, 6], [3, 4])).toBe(45)
})
