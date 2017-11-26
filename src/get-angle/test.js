import test from 'tape'
import { round } from '@turf/helpers'
import getAngle from './'

test('get-angle', t => {
  t.equal(round(getAngle([5, 5], [5, 6], [3, 4])), 45)
  t.end()
})

test('test-angle -- issues', t => {
  const start = [167.72709868848324, -45.56543836343071]
  const mid = [167.7269698586315, -45.56691059720167]
  const end = [167.72687866352499, -45.566989345276355]
  const angle = getAngle(start, mid, end)

  t.false(isNaN(angle))
  t.end()
})
