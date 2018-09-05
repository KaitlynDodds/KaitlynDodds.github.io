'use strict';

var gulp        = require('gulp');
var useref      = require('gulp-useref');
var gulpif      = require('gulp-if');
var uglifyes    = require('uglify-es');
var composer    = require('gulp-uglify/composer');
var uglify      = composer(uglifyes, console);
var nano        = require('gulp-cssnano');
var del         = require('del');

var options = {
    src: 'src',
    dist: 'dist'
};

gulp.task('html:prod', function() {
    return gulp.src(options.src + '/index.html')
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', nano()))
            .pipe(gulp.dest(options.dist));
});

gulp.task('fonts:prod', function() {
    return gulp.src([
                options.src + '/fonts/**' ], 
                {base: 'src/'})
            .pipe(gulp.dest(options.dist));
});

gulp.task('all:prod', gulp.parallel(
    'html:prod', 'fonts:prod'
));

gulp.task('clean', function() {
    return del([options.dist]);
});

gulp.task('build:prod', gulp.series('clean', 'all:prod'));

gulp.task('default', gulp.series('build:prod'));