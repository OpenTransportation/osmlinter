import { Feature, FeatureCollection, LineString } from '@turf/helpers'

/**
 * Impossible Angle, this validator detects lines with less likely turning angles.
 */
export default function impossibleAngle<G extends LineString>(
    line: FeatureCollection<G> | Feature<G> | G,
    options?: {
        minAngle?: number
        maxAngle?: number
    }
): boolean
