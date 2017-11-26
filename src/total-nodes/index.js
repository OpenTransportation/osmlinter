const { coordReduce } = require('@turf/meta')

/**
 * Count the amount of Nodes in a GeoJSON Geometry
 *
 * @param {GeoJSON} geojson GeoJSON
 * @returns {number} Total number of nodes in GeoJSON
 * @example
 * const line = turf.lineString([[10, 5], [-10, 0]])
 * totalNodes(line) // => 2
 */
export default function totalNodes (geojson) {
  return coordReduce(geojson, total => total + 1, 0)
}
