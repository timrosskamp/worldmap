"use strict";

const gulp = require('gulp');
const pump = require('pump');

const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

gulp.task('sass', done => {
    pump([
        gulp.src('src/scss/**/*.scss'),
        concat('stylesheet.scss'),
        sass({
			includePaths: [
				'./node_modules'
			]
        }),
        postcss([
			mqpacker({
				sort: true,
			}),
            pxtorem({
                rootValue: 16,
                unitPrecision: 2,
                propList: [
                    'font',
                    'font-size',
                    'letter-spacing'
                ],
                replace: true,
                mediaQuery: true
            }),
            autoprefixer(),
			cssnano({
				discardComments: {
					removeAll: true
				}
			})
		]),
        gulp.dest('public/assets/css')
    ], done);
});

gulp.task('build', ['sass']);

gulp.task('watch', ['build'], () => {
    gulp.watch(['src/scss/**'], { cwd: __dirname }, ['sass']);
});