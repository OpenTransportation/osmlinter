#!/usr/bin/env node

const path = require('path')
const glob = require('glob')
const write = require('write-json-file')
const featureCollection = require('@turf/helpers').featureCollection
const osm2geojson = require('./osm2geojson')

// Convert OSM XML to GeoJSON
if (process.env.REGEN) {
  glob.sync(path.join(__dirname, '..', 'validators', '*', 'test', 'in', '*.osm')).forEach(filepath => {
    const features = []
    const stream = osm2geojson(filepath, { failEvents: true })
    stream.on('data', feature => {
      features.push(feature)
    })
    stream.on('end', () => {
      write.sync(filepath.replace('.osm', '.geojson'), featureCollection(features))
    })
  })
}
