import { Feature, Properties, FeatureCollection, Point, MultiLineString, LineString } from '@turf/helpers'

export interface ClosestEndNodesProperties {
    distance: number;
    featureIndex: number;
    closestFeatureIndex: number;
    closestPoint: [number, number];
    [key: string]: any;
}

/**
 * Closest End Nodes, this validator detects if a line has ending nodes closer to other lines.
 *
 * JSOM Linter (Way end node near other highway)
 */
export default function closestEndNodes<G extends LineString | MultiLineString, P = Properties>(
    lines: FeatureCollection<G, P> | Feature<G, P> | G,
    options?: {
        maxDistance?: number
        units?: string
    }
): FeatureCollection<G, P>
