var gulp = require('gulp')
var path = require('path')

gulp.task('clean', function (done) {
  var fs = require('fs-extra')
  fs.remove(path.join(__dirname, 'build'), done)
})

gulp.task('lint', function () {
  var standard = require('gulp-standard')
  return gulp.src(['index.js', 'test/**/*.js', 'gulpfile.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', { breakOnError: true }))
})

gulp.task('build', ['clean'], function () {
  var webpack = require('webpack-stream')
  return gulp.src('')
    .pipe(webpack(require('./test/webpack.config')))
    .pipe(gulp.dest('build/'))
})

gulp.task('test', ['build'], function () {
  var mocha = require('gulp-mocha')
  return gulp.src('build/*.js', { read: false }).pipe(mocha())
})

gulp.task('default', ['lint', 'test'])
