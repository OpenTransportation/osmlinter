import pointOnLine from '@turf/point-on-line'
import { flattenEach } from '@turf/meta'
import { getType, getCoords } from '@turf/invariant'
import { point, featureCollection } from '@turf/helpers'
import pointToLineDistance from '@turf/point-to-line-distance'

/**
 * Closest End Nodes, this validator detects if a line has ending nodes closer to other lines.
 *
 * End Nodes touching lines are ignored.
 *
 * JSOM Linter (Way end node near other highway)
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines GeoJSON (Multi)LineString(s)
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
  const maxDistance = (options.maxDistance !== undefined) ? options.maxDistance : 7.5
  const units = (options.units !== undefined) ? options.units : 'meters'

  // Validation
  if (!lines) throw new Error('lines is required')

  // Iterate over each Start & End nodes
  const closestEndNodes = []
  flattenEach(lines, function (line1, featureIndex1, featureSubIndex1) {
    if (getType(line1) !== 'LineString') return null
    const coords = getCoords(line1)
    const start = coords[0]
    const end = coords[coords.length - 1]

    // Iterate over each other lines to see if end nodes are too close
    flattenEach(lines, (line2, featureIndex2, featureSubIndex2) => {
      if (getType(line1) !== 'LineString') return null
      if (getType(line2) !== 'LineString') return null;
      [start, end].forEach(endNode => {
        if (featureIndex1 === featureIndex2) return null
        const distance = pointToLineDistance(endNode, line2, {units: units})

        if (distance !== 0 && maxDistance > distance) {
          // Add results to GeoJSON properties
          const properties = {
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
