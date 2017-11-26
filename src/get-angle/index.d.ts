import { Coord } from '@turf/helpers'

/**
 * Finds the angle between 3 points.
 */
export default function (
    startPoint: Coord,
    midPoint: Coord,
    endPoint: Coord,
    options?: {
        precision?: number
    }
): number
