import { Feature, FeatureCollection, LineString } from '@turf/helpers'

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines GeoJSON (Multi)LineString(s)
 * @param {Object} [options] Optional parameters
 * @param {number} [options.minAngle=10] Minimum Angle in degrees
 * @param {number} [options.maxAngle=Infinity] Maximum Angle in degrees
 * @returns {boolean} true/false
 * @example
 * const line = {
 *   type: 'LineString',
 *   coordinates: [[5, 5], [5, 6], [3, 4]]
 * }
 * osmlinter.impossibleAngle(line)
 */
export default function impossibleAngle<G extends LineString>(
    line: FeatureCollection<G> | Feature<G> | G,
    options?: {
        minAngle?: number
        maxAngle?: number
    }
): boolean
