/**
 * Finds the angle between 3 points.
 */
export function findAngle<T extends Point>(
    startPoint: T | GeoJSON.Feature<T> | number[],
    midPoint: T | GeoJSON.Feature<T> | number[],
    endPoint: T | GeoJSON.Feature<T> | number[],
    options?: {
        precision?: number
    }
): number
