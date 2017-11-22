import { Coord } from '@turf/helpers'

/**
 * Finds the angle between 3 points.
 */
export function findAngle(
    startPoint: Coord,
    midPoint: Coord,
    endPoint: Coord,
    options?: {
        precision?: number
    }
): number
