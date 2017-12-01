import { lineReduce } from '@turf/meta'

/**
 * Detects if line is closed
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} geojson LineString(s) or Polygons(s)
 * @param {Object} [options={}] Optional parameters
 * @return {boolean} true/false if line is closed
 * @example
 * const line1 = turf.lineString([[5, 5], [5, 6], [3, 4], [5, 5]])
 * const line2 = turf.lineString([[5, 5], [5, 6], [3, 4], [3, 3]])
 *
 * osmlinter.isLineClosed(line1)
 * //=true
 * osmlinter.isLineClosed(line2)
 * //=false
 */
export default function (geojson, options) {
  options = options || {}

  return lineReduce(geojson, (isClosed, line) => {
    const coords = line.geometry.coordinates
    const start = coords[0]
    const end = coords[coords.length - 1]

    if (isClosed === true) return true
    if (start[0] === end[0] && start[1] === end[1]) return true
    return false
  }, null)
}
