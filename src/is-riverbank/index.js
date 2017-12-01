import { getGeom } from '@turf/invariant'

/**
 * Detects if geometry is highly likely to be a riverbank
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} geojson LineString(s) or Polygons(s)
 * @param {Object} [options={}] Optional parameters
 * @returns {boolean} true/false
 * @example
 * const line = {
 *   type: 'LineString',
 *   coordinates: [[5, 5], [5, 6], [3, 4]]
 * }
 * osmlinter.isRiverbank(line)
 * //=true/false
 */
export default function isRiverbank (geojson, options) {
  // Optional Paramters
  options = options || {}

  // Validation
  if (!geojson) throw new Error('geojson is required')

  // Normalize
  const geom = getGeom(geojson)
  const type = geom.type
  const coords = geom.coordinates

  return true
}
