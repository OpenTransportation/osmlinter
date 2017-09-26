/// <reference types="geojson" />

/**
 * Finds the angle between 3 points.
 */
export function findAngle<T extends GeoJSON.Point>(
    startPoint: T | GeoJSON.Feature<T> | number[],
    midPoint: T | GeoJSON.Feature<T> | number[],
    endPoint: T | GeoJSON.Feature<T> | number[],
    options?: {
        precision?: number
    }
): number

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 */
export function impossibleAngle<T extends GeoJSON.LineString>(
    line: GeoJSON.Feature<T> | T,
    options?: {
        threshold?: number
    }
): boolean