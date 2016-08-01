'use strict';

// require gulp packages
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');

// function to errors catching
function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    }
    var outStream = taskFn(onSuccess, onError);
    if(outStream && typeof outStream.on === 'function') {
      outStream.on('end', onSuccess);
    }
  }
}

// default task
gulp.task('default',  function() {  
  var client = ['js', 'css'];
    gulp.watch('./src/**/*.js', client);
    gulp.watch('./src/**/*.css', client);
});

// task to concat and minify js
gulp.task('js', wrapPipe(function(success, error) {
  return gulp.src('./src/**/*.js')
  .pipe(concat('app.min.js').on('error', error))
  .pipe(uglify().on('error', error))
  .pipe(gulp.dest('./dist/js/'));
}));

// task to concatenate, minify css and adding of prefixes
gulp.task('css', wrapPipe(function (success, error) {
  return gulp.src('./src/**/*.css')
    .pipe(concat('styles.min.css').on('error', error))
    .pipe(minify().on('error', error))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }).on('error', error))
    .pipe(gulp.dest('./dist/css/'));
}));
