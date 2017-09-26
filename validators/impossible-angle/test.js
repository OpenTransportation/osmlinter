const test = require('tape')
const path = require('path')
const glob = require('glob')
const load = require('load-json-file')
const lineString = require('@turf/helpers').lineString
const impossibleAngle = require('../..').impossibleAngle

test('impossible-angle', t => {
  // True
  glob.sync(path.join(__dirname, 'test', 'true', '*.geojson')).forEach(filepath => {
    const line = load.sync(filepath)
    t.true(impossibleAngle(line, line.properties))
  })
  // False
  glob.sync(path.join(__dirname, 'test', 'false', '*.geojson')).forEach(filepath => {
    const line = load.sync(filepath)
    t.false(impossibleAngle(line, line.properties))
  })
  t.end()
})

test('impossible-angle -- GeoJSON', t => {
  const line = lineString([[5, 5], [5, 6], [3, 4]])

  t.true(impossibleAngle(line))
  t.true(impossibleAngle(line.geometry))
  t.false(impossibleAngle(line.geometry, { threshold: 60 }))
  t.end()
})

test('impossible-angle -- throws errors', t => {
  t.throws(() => impossibleAngle(null), /line is required/, 'line is required')
  t.end()
})
