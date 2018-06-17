"use strict";

const gulp = require('gulp');
const pump = require('pump');

const sass = require('gulp-sass');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

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
			cssnano(),
		]),
        gulp.dest('assets/css')
    ], done);
});

gulp.task('build', ['sass']);

gulp.task('watch', ['build'], () => {
    gulp.watch(['src/scss/**'], { cwd: __dirname }, ['sass']);
});