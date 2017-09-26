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
    var previousCoords = getCoords(previousSegment)
    var currentCoords = getCoords(currentSegment)

    var A = previousCoords[0]
    var B = currentCoords[0]
    var C = currentCoords[1]
    if (findAngle(A, B, C) < threshold) isImpossible = true
    return currentSegment
  })
  return isImpossible
}
