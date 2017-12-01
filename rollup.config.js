import babel from 'rollup-plugin-babel'
import node from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'

export default [{
  input: 'index.js',
  extend: true,
  output: {
    file: 'osmlinter.mjs',
    format: 'es'
  },
  plugins: [node()]
},
{
  input: 'index.js',
  extend: true,
  output: {
    file: 'osmlinter.js',
    format: 'cjs'
  },
  plugins: [node(), babel()]
},
{
  input: 'index.js',
  extend: true,
  output: {
    file: 'osmlinter.min.js',
    format: 'umd',
    name: 'osmlinter'
  },
  plugins: [node(), babel(), uglify()]
}]
