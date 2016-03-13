var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    csslint = require('gulp-csslint'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');

var paths = {
  jsServerFiles : ['routes/*.js', 'app.js', 'server.js', 'socketCtrl.js' ],
  jsStaticFiles : ['public/javascripts/*.js'],
  cssFiles      : ['public/stylesheets/*.css'],
  views         : ['views/**.*']
}


gulp.task('default', ['lint', 'serve', 'watch']);

gulp.task('lint', ['jshint', 'csslint']);

gulp.task('serve', () => {
  nodemon({ script: 'server.js'
          , watch: [paths.jsServerFiles, paths.views]
          , env: { 'NODE_ENV': 'development' }
          , tasks: [] })
    .on('restart', () => {
      console.log('restarted!');
    });
});

gulp.task('jshint', () => {
  return gulp.src(paths.jsServerFiles.concat(paths.jsStaticFiles))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', () => {
  return gulp.src(paths.cssFiles)
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(paths.jsStaticFiles.concat(paths.jsServerFiles), ['jshint']);
  gulp.watch(paths.cssFiles, ['csslint']);
  gulp.watch(paths.views.concat(paths.jsStaticFiles, paths.jsServerFiles, paths.cssFiles))
    .on('change', (event) => {
      livereload.changed(event.path);
    });
});
