import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

function assign ({file, format, plugins}) {
  return {
    input: 'index.js',
    output: {
      extend: true,
      file,
      format: format || 'umd',
      name: 'osmlinter'
    },
    plugins: [
      nodeResolve()
    ].concat(plugins || [])
  }
}

export default [
  assign({format: 'es', file: 'osmlinter.mjs'}),
  assign({format: 'umd', file: 'osmlinter.js'}),
  assign({format: 'umd', file: 'osmlinter.min.js', plugins: [ uglify() ]})
]
