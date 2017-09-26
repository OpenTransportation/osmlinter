import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

function assign (options) {
  return {
    input: 'index.js',
    output: {
      extend: true,
      file: options.file,
      format: options.format || 'umd',
      name: 'osmlinter'
    },
    plugins: [
      nodeResolve()
    ].concat(options.plugins || [])
  }
}

export default [
  assign({format: 'es', file: 'osmlinter.mjs'}),
  assign({format: 'umd', file: 'osmlinter.js'}),
  assign({format: 'umd', file: 'osmlinter.min.js', plugins: [ uglify() ]})
]
