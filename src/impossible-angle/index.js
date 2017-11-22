import { segmentReduce } from '@turf/meta'
import { getCoords } from '@turf/invariant'
import { findAngle } from '../utils'

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines GeoJSON (Multi)LineString(s)
 * @param {Object} [options] Optional parameters
 * @param {number} [options.minAngle=10] Minimum Angle in degrees
 * @param {number} [options.maxAngle=Infinity] Maximum Angle in degrees
 * @returns {boolean} true/false
 * @example
 * const line = {
 *   type: 'LineString',
 *   coordinates: [[5, 5], [5, 6], [3, 4]]
 * }
 * osmlinter.impossibleAngle(line)
 */
export default function impossibleAngle (lines, options) {
  // Optional Paramters
  options = options || {}
  var maxAngle = options.maxAngle || Infinity
  var minAngle = options.minAngle || 10

  // Validation
  if (!lines) throw new Error('line is required')

  // Main
  var isImpossible = false
  segmentReduce(lines, function (previousSegment, currentSegment, featureIndex, featureSubIndex, segmentIndex) {
    var startPoint = getCoords(previousSegment)[0]
    var midPoint = getCoords(currentSegment)[0]
    var endPoint = getCoords(currentSegment)[1]

    var angle = findAngle(startPoint, midPoint, endPoint)
    if (angle < minAngle) isImpossible = true
    if (angle > maxAngle) isImpossible = true
    return currentSegment
  })
  return isImpossible
}
