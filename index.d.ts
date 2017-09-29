/// <reference types="geojson" />

type Point = GeoJSON.Point
type LineString = GeoJSON.LineString
type MultiLineString = GeoJSON.MultiLineString

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 */
export function impossibleAngle<T extends LineString>(
    line: GeoJSON.FeatureCollection<T> | GeoJSON.Feature<T> | T,
    options?: {
        threshold?: number
    }
): boolean

/**
 * Closest End Nodes, this validator detects if a line has ending nodes closer to other lines.
 *
 * JSOM Linter (Way end node near other highway)
 */
export function closestEndNodes<T extends LineString | MultiLineString>(
    lines: GeoJSON.FeatureCollection<T> | GeoJSON.Feature<T> | T,
    options?: {
        maxDistance?: number
        units?: string
    }
): GeoJSON.FeatureCollection<Point>