import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import includePaths from 'rollup-plugin-includepaths';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
//import babel from 'rollup-plugin-babel';

export default {
    input: "src/js/index.js",
    output: {
        file: "public/assets/js/app.bundle.js",
        format: "iife",
        sourcemap: false
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify('production')
        }),
        vue(),
        json(),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/lory.js/dist/lory.js': ['lory']
            }
        }),
        includePaths({
            paths: ['src/js'],
            extensions: ['.js', '.json', '.vue']
        }),
        resolve({
            extensions: ['.js', '.json', '.vue']
        })
    ],
    watch: {
        clearScreen: false
    }
}