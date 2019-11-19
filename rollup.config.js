import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/color-curves.js',
    output: [
        {
            file: 'build/color-curves.js',
            format: 'cjs'
        },
        {
            file: 'build/color-curves.module.js',
            format: 'es'
        },
        {
            file: 'build/color-curves.min.js',
            format: 'iife',
            name: 'ColorCurves',
            plugins: [terser()]
        }
    ],
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ]
};