import { Feature, LineString, Polygon, MultiLineString, MultiPolygon } from '@turf/helpers'

/**
 * Detects if LineString is closed
 */
export default function<G extends LineString | Polygon | MultiLineString | MultiPolygon> (
    geojson: Feature<G> | G,
): boolean
