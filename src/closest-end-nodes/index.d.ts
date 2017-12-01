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
 * End Nodes touching lines are ignored.
 *
 * JSOM Linter (Way end node near other highway)
 *
 * @param {FeatureCollection|Feature<LineString|MultiLineString>} lines GeoJSON (Multi)LineString(s)
 * @param {Object} [options] Optional parameters
 * @param {number} [options.maxDistance=7.5] Maximum distance a node is allowed from lines
 * @param {number} [options.units="meters"] Measured distance units (kilometers, meters, miles)
 * @returns {FeatureCollection<Point>} End nodes near other lines
 * @example
 * const lines = turf.featureCollection([
 *   turf.lineString([[5.00001, 6.00001], [2, 2], [0, 1]]),
 *   turf.lineString([[5, 5], [5, 6], [3, 4]])
 * ])
 * const endNodes = osmlinter.closestEndNodes(lines)
 * //=endNodes
 */
export default function closestEndNodes<G extends LineString | MultiLineString, P = Properties>(
    lines: FeatureCollection<G, P> | Feature<G, P> | G,
    options?: {
        maxDistance?: number
        units?: string
    }
): FeatureCollection<G, P>
