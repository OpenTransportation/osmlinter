const path = require('path')
const glob = require('glob')
const load = require('load-json-file')
const impossibleAngle = require('../..').impossibleAngle

test('impossible-angle', () => {
  // True
  glob.sync(path.join(__dirname, 'test', 'true', '*.geojson')).forEach(filepath => {
    const line = load.sync(filepath)
    const options = line.properties || {}
    expect(impossibleAngle(line, options)).toBeTruthy()
  })
  // False
  glob.sync(path.join(__dirname, 'test', 'false', '*.geojson')).forEach(filepath => {
    const line = load.sync(filepath)
    const options = line.properties || {}
    expect(impossibleAngle(line, options)).toBeFalsy()
  })
})
