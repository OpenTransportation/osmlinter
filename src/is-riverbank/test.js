import test from 'tape'
import path from 'path'
import glob from 'glob'
import load from 'load-json-file'
import isRiverbank from './'

test('is-building -- boolean', t => {
  // True
  glob.sync(path.join(__dirname, 'test', 'true', '*.json')).forEach(filepath => {
    const geojson = load.sync(filepath)
    t.true(isRiverbank(geojson, geojson.properties), path.parse(filepath).name)
  })
  // False
  glob.sync(path.join(__dirname, 'test', 'false', '*.json')).forEach(filepath => {
    const geojson = load.sync(filepath)
    t.false(isRiverbank(geojson, geojson.properties), path.parse(filepath).name)
  })
  t.end()
})
