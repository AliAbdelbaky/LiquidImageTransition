const { dest } = require('gulp');
const GULP = require('gulp'),
    CONCAT = require("gulp-concat"),
    PREFIX = require('gulp-autoprefixer'),
    SASS = require('gulp-sass'),
    PUG = require('gulp-pug'),
    LIVERELOAD = require('gulp-livereload'),
    SOURCEMAPS = require('gulp-sourcemaps'),
    MINIFY = require('gulp-minify'),
    NOTIFY = require('gulp-notify');
//- Tasks
//- HTML
GULP.task('pug', () => {
    return GULP.src('stage/html/*.pug')
        .pipe(PUG({
            pretty: true
        }))
        .pipe(dest('dist'))
        .pipe(NOTIFY('Your Html Is Ready!'))
        .pipe(LIVERELOAD());
});
//- CSS
GULP.task('sass', () => {
    return GULP.src(['stage/css/**/*.sass', 'stage/css/**/*.css'])
        .pipe(SOURCEMAPS.init())
        .pipe(SASS({
            outputStyle: 'compressed'
        })).on('error', SASS.logError)
        .pipe(PREFIX())
        .pipe(CONCAT('main.css'))
        .pipe(dest('./dist/css'))
        .pipe(NOTIFY('Your CSS Is Ready'))
        .pipe(LIVERELOAD());
});
//- JS
GULP.task('js', () => {
    return GULP.src(['stage/js/libs/*.js', 'stage/js/app/*.js'])
        .pipe(CONCAT('main.js'))
        .pipe(MINIFY())
        .pipe(dest('./stage/js/all'))
        .pipe(NOTIFY('Your Js Is Ready!'))
        .pipe(LIVERELOAD());
});
//- JS Relocate
GULP.task('js-relocate', () => {
    return GULP.src('stage/js/all/*.js')
        .pipe(dest('./dist/js'))
        .pipe(NOTIFY('Your Js Is Ready!'))
        .pipe(LIVERELOAD());
});
//- Assets
GULP.task('assets', () => {
    return GULP.src('./stage/assets/*.*')
        .pipe(dest('./dist/img'))
        .pipe(NOTIFY('Your Images Is Ready!'))
});
//- Watch
GULP.task('watch', () => {
    require('./server');
    LIVERELOAD.listen();
    GULP.watch('./stage/html/**/*.pug', GULP.series('pug'));
    GULP.watch(['stage/css/**/*.sass', 'stage/css/**/*.css'], GULP.series('sass'));
    GULP.watch(['stage/js/libs/*.js', 'stage/js/app/*.js'], GULP.series('js'));
    GULP.watch('stage/js/all/*.js', GULP.series('js-relocate'));
    GULP.watch('./stage/assets/*.*', GULP.series('assets'));
});