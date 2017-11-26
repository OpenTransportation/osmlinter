import test from 'tape'
import getAngle from './'

test('get-angle', t => {
  t.equal(getAngle([5, 5], [5, 6], [3, 4]), 45)
  t.end()
})
