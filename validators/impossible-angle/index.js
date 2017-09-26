import { segmentEach, segmentReduce } from '@turf/meta'

/**
 * Impossible Angle
 * This validator detects lines with less likely turning angles.
 *
 * @param {Feature<LineString|MultiLineString>} line (Multi)LineString
 * @param {Object} [options] Optional parameters
 * @param {number} [options.threshold=10] Threshold in degrees
 * @returns {boolean} true/false
 */
export default function (line, options) {
  var count = 0;
  segmentReduce(line, function (previousSegment, currentSegment) {
    count++;
    console.log(count)
    // return currentSegment;
  }, null);
  return true;
}

function findAngle(A, B, C) {
  // A first point; C second point; B center point
  var pi = 3.14159265;
  var AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  var BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
  var AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / pi);
}