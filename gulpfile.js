var gulp = require('gulp')
var connect = require('gulp-connect')
var stylus = require('gulp-stylus')
var stylusSrc = './assets/src/css/**/*.styl'
var stylusDest = './assets/dest/css'
gulp.task('dev', function () {
  connect.server({
    port: 8080,
    livereload: {
      port: 35728
    }
  })
})
gulp.task('reload', function () {
  gulp.src('./src/**/*').pipe(connect.reload())
})
gulp.task('stylus', function () {
  gulp.src(stylusSrc)
  .pipe(stylus())
  .pipe(gulp.dest(stylusDest))
  .pipe(connect.reload())
})
gulp.task('watch', function () {
  gulp.watch(stylusSrc, ['stylus'])
  gulp.watch(['./src/**/*'], ['reload'])
})
gulp.task('default', ['dev', 'watch'])