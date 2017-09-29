import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
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
      nodeResolve({ module: true, jsnext: true }),
      commonjs({include: 'node_modules/**'})
    ].concat(options.plugins || [])
  }
}

export default [
  assign({format: 'cjs', file: 'osmlinter.js'}),
  assign({format: 'umd', file: 'osmlinter.min.js', plugins: [uglify()]})
]
