import test from 'tape'
import { round } from '@turf/helpers'
import getAngle from './'

test('get-angle', t => {
  t.equal(round(getAngle([5, 5], [5, 6], [3, 4])), 45)
  t.end()
})
