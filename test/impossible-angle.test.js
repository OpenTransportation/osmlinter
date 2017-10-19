import test from 'tape'
import path from 'path'
import glob from 'glob'
import load from 'load-json-file'
import write from 'write-json-file'
import truncate from '@turf/truncate'
import { featureEach } from '@turf/meta'
import { lineString, featureCollection } from '@turf/helpers'
import { impossibleAngle } from '../'

test('impossible-angle', t => {
  glob.sync(path.join(__dirname, 'test', 'in', '*.geojson')).forEach(filepath => {
    const outpath = filepath.replace(path.join('test', 'in'), path.join('test', 'out'))
    const results = featureCollection([])
    const geojson = load.sync(filepath)
    featureEach(geojson, feature => {
      const isImpossible = impossibleAngle(feature, geojson.properties)
      if (isImpossible) feature.properties = { stroke: '#F00', 'stroke-width': 5 }
      results.features.push(feature)
    })
    // Add Results
    truncate(results, 6, 2, true)
    if (process.env.REGEN) write.sync(outpath, results)
    t.deepEqual(load.sync(outpath), results)
  })
  t.end()
})

test('impossible-angle -- boolean', t => {
  // True
  glob.sync(path.join(__dirname, 'test', 'true', '*.geojson')).forEach(filepath => {
    const geojson = load.sync(filepath)
    t.true(impossibleAngle(geojson, geojson.properties))
  })
  // False
  glob.sync(path.join(__dirname, 'test', 'false', '*.geojson')).forEach(filepath => {
    const geojson = load.sync(filepath)
    t.false(impossibleAngle(geojson, geojson.properties))
  })
  t.end()
})

test('impossible-angle -- GeoJSON', t => {
  const line = lineString([[5, 5], [5, 6], [3, 4]])

  t.false(impossibleAngle(line))
  t.false(impossibleAngle(line.geometry))
  t.true(impossibleAngle(line.geometry, { minAngle: 60 }))
  t.true(impossibleAngle(line.geometry, { maxAngle: 10 }))
  t.end()
})

test('impossible-angle -- throws errors', t => {
  t.throws(() => impossibleAngle(null), /line is required/, 'line is required')
  t.end()
})
