import { Feature, LineString, MultiLineString, Polygon, MultiPolygon } from '@turf/helpers'

/**
 * Detects if geometry is highly likely to be a building
 */
export default function isBuilding<G extends LineString | MultiLineString | Polygon | MultiPolygon>(
    geojson: Feature<G> | G,
    options?: {}
): boolean
