import test from 'tape'
import path from 'path'
import glob from 'glob'
import load from 'load-json-file'
import { isBuilding } from './'

test('is-building -- boolean', t => {
  // True
  glob.sync(path.join(__dirname, 'test', 'true', '*.geojson')).forEach(filepath => {
    const geojson = load.sync(filepath)
    t.true(isBuilding(geojson, geojson.properties))
  })
  // False
  glob.sync(path.join(__dirname, 'test', 'false', '*.geojson')).forEach(filepath => {
    const geojson = load.sync(filepath)
    t.false(isBuilding(geojson, geojson.properties))
  })
  t.end()
})
