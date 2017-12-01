import { getGeom } from '@turf/invariant'

/**
 * Detects if geometry is highly likely to be a building
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} geojson LineString(s) or Polygons(s)
 * @param {Object} [options={}] Optional parameters
 * @returns {boolean} true/false
 * @example
 * const line = {
 *   type: 'LineString',
 *   coordinates: [[5, 5], [5, 6], [3, 4]]
 * }
 * osmlinter.isBuilding(line)
 * //=true/false
 */
export default function isBuilding (geojson, options) {
  // Optional Paramters
  options = options || {}

  // Validation
  if (!geojson) throw new Error('geojson is required')

  // Normalize
  const geom = getGeom(geojson)
  const type = geom.type
  const coords = geom.coordinates

  switch (type) {
    case 'Polygon':
      return true
    case 'LineString':
      // Detects if first coordinate is the same as the last coordinate
      const first = coords[0]
      const last = coords[coords.length - 1]
      const x1 = first[0]
      const y1 = first[1]
      const x2 = last[0]
      const y2 = last[1]
      if (x1 === x2 && y1 === y2) return true
      return false
    case 'MultiPolygon':
    case 'MultiLineString':
      throw new Error('not implemented')
  }
  return true
}
