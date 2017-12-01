import { Feature, LineString, MultiLineString, Polygon, MultiPolygon } from '@turf/helpers'

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
export default function isBuilding<G extends LineString | MultiLineString | Polygon | MultiPolygon>(
    geojson: Feature<G> | G,
    options?: {
        minArea?: number
        maxArea?: number
    }
): boolean
