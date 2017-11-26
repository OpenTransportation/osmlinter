import { getCoord } from '@turf/invariant'
import { round } from '@turf/helpers'

/**
 * Finds the angle between 3 points.
 *
 * @param {number[]} startPoint Start Point Coordiantes
 * @param {number[]} midPoint Mid Point Coordinates
 * @param {number[]} endPoint End Point Coordinates
 * @param {Object} [options] Optional parameters
 * @param {number} [options.precision] Number of precison
 * @return {number} angle
 * @example
 * osmlinter.getAngle([5, 5], [5, 6], [3, 4])
 * //=45
 */
export default function (startPoint, midPoint, endPoint, options) {
  options = options || {}
  var precision = options.precision || 6

  // Rename to shorter variables
  var A = getCoord(startPoint)
  var B = getCoord(midPoint)
  var C = getCoord(endPoint)

  // A first point C second point B center point
  var pi = 3.14159265
  var AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2))
  var BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2))
  var AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2))
  var angle = Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / pi)
  return round(angle, precision)
}
