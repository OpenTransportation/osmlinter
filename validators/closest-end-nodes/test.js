const path = require('path')
const test = require('tape')
const glob = require('glob')
const load = require('load-json-file')
const write = require('write-json-file')
const circle = require('@turf/circle')
const featureEach = require('@turf/meta').featureEach
const lineString = require('@turf/helpers').lineString
const featureCollection = require('@turf/helpers').featureCollection
const truncate = require('@turf/truncate')
const closestEndNodes = require('../..').closestEndNodes

test('closestEndNodes', t => {
  glob.sync(path.join(__dirname, 'test', 'in', '*.geojson')).forEach(filepath => {
    const outpath = filepath.replace(path.join('test', 'in'), path.join('test', 'out'))
    const geojson = load.sync(filepath)
    const results = featureCollection([])
    const endNodes = closestEndNodes(geojson)

    // Add radius circles
    featureEach(endNodes, endNode => {
      const distance = endNode.properties.distance
      const featureIndex = endNode.properties.featureIndex
      results.features.push(circle(endNode, distance, null, 'meters', {fill: '#800000', stroke: '#800000'}))
      geojson.features[featureIndex].properties = {stroke: '#F00', 'stroke-width': 5}
    })
    // Add existing data
    featureEach(geojson, feature => results.features.push(feature))
    truncate(results, 6, 2, true)
    if (process.env.REGEN) write.sync(outpath, results)
    t.deepEqual(results, load.sync(outpath))
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
