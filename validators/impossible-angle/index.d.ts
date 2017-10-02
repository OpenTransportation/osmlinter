import { Feature, FeatureCollection, LineString } from '@turf/helpers'

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 */
export default function impossibleAngle<T extends LineString>(
    line: FeatureCollection<T> | Feature<T> | T,
    options?: {
        minAngle?: number
        maxAngle?: number
    }
): boolean
