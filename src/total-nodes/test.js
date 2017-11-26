import test from 'tape'
import { lineString } from '@turf/helpers'
import totalNodes from '.'

test('total-nodes', t => {
  const line = lineString([[10, 5], [-10, 0]])
  t.equal(totalNodes(line), 2)
  t.end()
})
