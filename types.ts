import { lineString } from '@turf/helpers'
import * as osmlinter from './'

// Fixtures
const line = lineString([[10, 10], [20, 30]])

// Closet End Nodes
const nodes = osmlinter.closestEndNodes(line)
const properties = nodes.features[0].properties

properties.closestFeatureIndex
properties.closestPoint
properties.distance
properties.featureIndex

osmlinter.closestEndNodes(line, {units: 'meters'})
osmlinter.closestEndNodes(line, {units: 'meters', maxDistance: 100})

// Impossible Angle
osmlinter.impossibleAngle(line)
osmlinter.impossibleAngle(line, {minAngle: 10})
osmlinter.impossibleAngle(line, {minAngle: 10, maxAngle: 40})