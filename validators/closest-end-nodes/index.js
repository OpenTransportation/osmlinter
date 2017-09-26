import { flattenEach } from '@turf/meta'
import { getCoords, getType } from '@turf/invariant'
import { point, featureCollection } from '@turf/helpers'
var pointToLineDistance = require('@turf/point-to-line-distance')
var pointOnLine = require('@turf/point-on-line')

/**
 * Closest End Nodes, this validator detects if a line has ending nodes closer to other lines.
 *
 * End Nodes touching lines are ignored.
 *
 * JSOM Linter (Way end node near other highway)
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines (Multi)LineString(s)
 * @param {Object} [options] Optional parameters
 * @param {number} [options.maxDistance=7.5] Maximum distance a node is allowed from lines
 * @param {number} [options.units="meters"] Measured distance units (kilometers, meters, miles)
 * @returns {FeatureCollection<Point>} End nodes near other lines
 * @example
 * const lines = turf.featureCollection([
 *   turf.lineString([[5.00001, 6.00001], [2, 2], [0, 1]]),
 *   turf.lineString([[5, 5], [5, 6], [3, 4]])
 * ])
 * const endNodes = osmlinter.closestEndNodes(lines)
 * //=endNodes
 */
export default function closestEndNodes (lines, options) {
  // Optional Paramters
  options = options || {}
  var maxDistance = (options.maxDistance !== undefined) ? options.maxDistance : 7.5
  var units = (options.units !== undefined) ? options.units : 'meters'

  // Validation
  if (!lines) throw new Error('lines is required')

  // Iterate over each Start & End nodes
  var closestEndNodes = []
  flattenEach(lines, function (line1, featureIndex1, featureSubIndex1) {
    if (getType(line1) !== 'LineString') return null
    var coords = getCoords(line1)
    var start = coords[0]
    var end = coords[coords.length - 1]

    // Iterate over each other lines to see if end nodes are too close
    flattenEach(lines, function (line2, featureIndex2, featureSubIndex2) {
      [start, end].forEach(function (endNode) {
        if (featureIndex1 === featureIndex2) return null
        var distance = pointToLineDistance(endNode, line2, units)

        if (distance !== 0 && maxDistance > distance) {
          // Add results to GeoJSON properties
          var properties = {
            distance: distance,
            featureIndex: featureIndex1,
            closestFeatureIndex: featureIndex2,
            closestPoint: getCoords(pointOnLine(line2, endNode))
          }
          closestEndNodes.push(point(endNode, properties))
        }
      })
    })
  })
  return featureCollection(closestEndNodes)
}
