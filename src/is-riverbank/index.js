import area from '@turf/area'
import isLineClosed from '../is-line-closed/index'
import { getType, getCoords } from '@turf/invariant'
import { isObject, isNumber, polygon, multiPolygon } from '@turf/helpers'

/**
 * Detects if geometry is highly likely to be a riverbank
 *
 * @param {Feature<LineString|MultiLineString|Polygon|MultiPolygon>} geojson LineString(s) or Polygons(s)
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.minArea=40000] Minimum area in square meters
 * @param {number} [options.maxArea=Infinity] Maximum area in square meters
 * @returns {boolean} true/false
 * @example
 * const line = turf.lineString([[5, 5], [5, 6], [3, 4]])
 *
 * osmlinter.isRiverbank(line)
 * //=true/false
 */
export default function isRiverbank (geojson, options) {
  // Optional Parameters
  options = options || {}
  if (!isObject(options)) throw new Error('options is invalid')
  const minArea = options.minArea || 40000
  const maxArea = options.maxArea || Infinity

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
