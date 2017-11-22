import { Feature, LineString, MultiLineString, Polygon, MultiPolygon } from '@turf/helpers'

/**
 * Is Building, detects if geometry is highly likely to be a building
 */
export default function isBuilding<T extends LineString | MultiLineString | Polygon | MultiPolygon>(
    geojson: Feature<T> | T,
    options?: {}
): boolean
