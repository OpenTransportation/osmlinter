import { Coord } from '@turf/helpers'

/**
 * Finds the angle between 3 points.
 *
 * @param {number[]} startPoint Start Point Coordiantes
 * @param {number[]} midPoint Mid Point Coordinates
 * @param {number[]} endPoint End Point Coordinates
 * @return {number} angle
 * @example
 * osmlinter.getAngle([5, 5], [5, 6], [3, 4])
 * //=45
 */
export default function (
    startPoint: Coord,
    midPoint: Coord,
    endPoint: Coord
): number
