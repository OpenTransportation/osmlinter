import test from 'tape'
import { lineString, polygon } from '@turf/helpers'
import isLineClosed from './'

test('is-line-closed', t => {
  // True
  t.true(isLineClosed(lineString([[5, 5], [5, 6], [3, 4], [5, 5]])))
  t.true(isLineClosed(polygon([[[5, 5], [5, 6], [3, 4], [5, 5]]])))

  // False
  t.false(isLineClosed(lineString([[5, 5], [5, 6], [3, 4], [3, 3]])))
  t.end()
})
