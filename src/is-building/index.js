import area from '@turf/area'
import { getCoords, getType } from '@turf/invariant'
import { polygon, multiPolygon, isObject, isNumber } from '@turf/helpers'
import isLineClosed from '../is-line-closed/index'

/**
 * Detects if geometry is highly likely to be a building
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} geojson LineString(s) or Polygons(s)
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.minArea=0] Minimum area in square meters
 * @param {number} [options.maxArea=40000] Maximum area in square meters
 * @returns {boolean} true/false
 * @example
 * const line = turf.lineString([[5, 5], [5, 6], [3, 4], [4, 4] [5, 5]])
 *
 * osmlinter.isBuilding(line)
 * //=true/false
 */
export default function isBuilding (geojson, options) {
  // Optional Parameters
  options = options || {}
  if (!isObject(options)) throw new Error('options is invalid')
  const minArea = options.minArea || 0
  const maxArea = options.maxArea || 40000

  // Validation
  if (!geojson) throw new Error('geojson is required')
  if (!isNumber(minArea)) throw new Error('minArea must be a number')
  if (!isNumber(maxArea)) throw new Error('maxArea must be a number')

  // Main
  // Riverbanks must be a closed LineString
  if (!isLineClosed(geojson)) return false
  const coords = getCoords(geojson)

  // Convert LineString to Polygon to calculate area
  switch (getType(geojson)) {
    case 'LineString':
      geojson = polygon([coords])
      break
    case 'MultiLineString':
      geojson = multiPolygon([coords])
      break
    default:
  }
  const areaMeters = area(geojson)
  return areaMeters < maxArea && areaMeters > minArea
}
