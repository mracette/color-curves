import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/color-curves.js',
    output: [
        {
            file: 'build/color-curves.js',
            format: 'cjs'
        },
        {
            file: 'build/color-curves.min.js',
            format: 'iife',
            name: 'ColorCurves',
            plugins: [terser()]
        }
    ]
};