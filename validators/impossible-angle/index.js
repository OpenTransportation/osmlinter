import { segmentReduce } from '@turf/meta'
import { getCoords } from '@turf/invariant'
import { findAngle } from '../utils/index'

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 *
 * @param {Feature<LineString|MultiLineString>} line (Multi)LineString
 * @param {Object} [options] Optional parameters
 * @param {number} [options.threshold=10] Threshold in degrees
 * @returns {boolean} true/false
 */
export default function impossibleAngle (line, options) {
  // Optional Paramters
  options = options || {}
  var threshold = (options.threshold !== undefined) ? options.threshold : 10

  // Validation
  if (!line) throw new Error('line is required')

  // Main
  var isImpossible = false
  segmentReduce(line, function (previousSegment, currentSegment, featureIndex, featureSubIndex, segmentIndex) {
    var startPoint = getCoords(previousSegment)[0]
    var midPoint = getCoords(currentSegment)[0]
    var endPoint = getCoords(currentSegment)[1]

    if (findAngle(startPoint, midPoint, endPoint) < threshold) isImpossible = true
    return currentSegment
  })
  return isImpossible
}
