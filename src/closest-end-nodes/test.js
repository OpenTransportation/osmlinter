import path from 'path'
import test from 'tape'
import glob from 'glob'
import load from 'load-json-file'
import write from 'write-json-file'
import circle from '@turf/circle'
import truncate from '@turf/truncate'
import { featureEach } from '@turf/meta'
import { featureCollection, lineString } from '@turf/helpers'
import closestEndNodes from './'

test('closestEndNodes', t => {
  glob.sync(path.join(__dirname, 'test', 'in', '*.json')).forEach(filepath => {
    const outpath = filepath.replace(path.join('test', 'in'), path.join('test', 'out'))
    const geojson = load.sync(filepath)
    const results = featureCollection([])
    const endNodes = closestEndNodes(geojson)

    // Add radius circles
    featureEach(endNodes, endNode => {
      const distance = endNode.properties.distance
      const featureIndex = endNode.properties.featureIndex
      results.features.push(circle(endNode, distance, {units: 'meters', properties: {fill: '#800000', stroke: '#800000'}}))
      geojson.features[featureIndex].properties = {stroke: '#F00', 'stroke-width': 5}
    })
    // Add existing data
    featureEach(geojson, feature => results.features.push(feature))
    truncate(results, {precision: 6, coordinates: 2, mutate: true})
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
