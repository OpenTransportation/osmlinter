import { Feature, LineString, MultiLineString, Polygon, MultiPolygon } from '@turf/helpers'

/**
 * Detects if geometry is highly likely to be a riverbank
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} geojson LineString(s) or Polygons(s)
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.minArea=40000] Minimum area in square meters
 * @param {number} [options.maxArea=Infinity] Maximum area in square meters
 * @returns {boolean} true/false
 * @example
 * const line = {
 *   type: 'LineString',
 *   coordinates: [[5, 5], [5, 6], [3, 4]]
 * }
 * osmlinter.isRiverbank(line)
 * //=true/false
 */
export default function isRiverbank<G extends LineString | MultiLineString | Polygon | MultiPolygon>(
    geojson: Feature<G> | G,
    options?: {
        minArea?: number
        maxArea?: number
    }
): boolean
