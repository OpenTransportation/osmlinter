import {
    Feature,
    FeatureCollection,
    Point,
    MultiLineString,
    LineString
} from '@turf/helpers'

export interface ClosestEndNodes {
    type: 'FeatureCollection';
    features: ClosestEndNodesPoint[]
}

export interface ClosestEndNodesPoint extends Feature<Point> {
    properties: ClosestEndNodesProps
}

export interface ClosestEndNodesProps {
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
export default function closestEndNodes<T extends LineString | MultiLineString>(
    lines: FeatureCollection<T> | Feature<T> | T,
    options?: {
        maxDistance?: number
        units?: string
    }
): ClosestEndNodes
