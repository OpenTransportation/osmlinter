const test = require('tape')
const { findAngle } = require('./')

test('utils -- findAngle', t => {
  t.equal(findAngle([5, 5], [5, 6], [3, 4]), 45)
  t.end()
})
