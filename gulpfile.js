'use strict';

var gulp        = require('gulp');
var useref      = require('gulp-useref');
var gulpif      = require('gulp-if');
var uglifyes    = require('uglify-es');
var composer    = require('gulp-uglify/composer');
var uglify      = composer(uglifyes, console);
var nano        = require('gulp-cssnano');
var del         = require('del');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var maps        = require('gulp-sourcemaps');

var options = {
    src: 'src/',
    dist: 'dist/'
};

/* General Tasks
*****************/

gulp.task('clean', function() {
    return del([options.dist]);
});


/* Dev Tasks
*************/

gulp.task('ws', function() {
    browserSync.init({
        server: {
            baseDir: options.src
        }
    });
});

gulp.task('compileSass', function() {
    return gulp.src(options.src + 'scss/application.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(options.src + 'css'))
    .pipe(browserSync.stream())
});

gulp.task('watch:styles', function() {
    gulp.watch(options.src + 'scss/**/*.scss', gulp.series('compileSass'));
    
});

gulp.task('watch:code', function() {
    gulp.watch(options.src + '*.html').on('change', browserSync.reload);
})

gulp.task('watch:all', gulp.parallel(
    'watch:code', 'watch:styles'
));

gulp.task('watch', gulp.parallel(
    'ws', 'watch:all'
));


/* Prod Build Tasks
********************/

gulp.task('html:prod', function() {
    return gulp.src(options.src + 'index.html')
            .pipe(useref())
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', nano()))
            .pipe(gulp.dest(options.dist));
});

gulp.task('fonts:prod', function() {
    return gulp.src([
                options.src + 'fonts/**' ], 
                {base: options.src })
            .pipe(gulp.dest(options.dist));
});

gulp.task('all:prod', gulp.parallel(
    'html:prod', 'fonts:prod'
));

gulp.task('build:prod', gulp.series('clean', 'all:prod'));

gulp.task('default', gulp.series('build:prod'));