import { Feature, LineString, MultiLineString, Polygon, MultiPolygon } from '@turf/helpers'

/**
 * Detects if geometry is highly likely to be a riverbank
 */
export default function isRiverbank<G extends LineString | MultiLineString | Polygon | MultiPolygon>(
    geojson: Feature<G> | G,
    options?: {}
): boolean
