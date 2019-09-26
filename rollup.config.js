import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  input: 'src/server.js',
  output: {
    file: 'dist/server.js',
    format: 'cjs'
  },
  external: external,
  plugins: [
    resolve(),
    commonjs()
  ]
}