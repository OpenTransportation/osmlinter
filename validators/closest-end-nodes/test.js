const path = require('path')
const test = require('tape')
const glob = require('glob')
const load = require('load-json-file')
const write = require('write-json-file')
const featureEach = require('@turf/meta').featureEach
const lineString = require('@turf/helpers').lineString
const featureCollection = require('@turf/helpers').featureCollection
const closestEndNodes = require('../..').closestEndNodes

test('closestEndNodes', t => {
  glob.sync(path.join(__dirname, 'test', 'in', '*.geojson')).forEach(filepath => {
    const outpath = filepath.replace(path.join('test', 'in'), path.join('test', 'out'))
    const geojson = load.sync(filepath)
    const result = closestEndNodes(geojson)

    featureEach(geojson, feature => result.features.push(feature))
    if (process.env.REGEN) write.sync(outpath, result)
    t.deepEqual(result, load.sync(outpath))
  })
  t.end()
})

test('closestEndNodes -- GeoJSON', t => {
  const lines = featureCollection([
    lineString([[5.00001, 6.00001], [2, 2], [0, 1]]),
    lineString([[5, 5], [5, 6], [3, 4]])
  ])
  t.equal(closestEndNodes(lines).features.length, 1)
  t.end()
})
