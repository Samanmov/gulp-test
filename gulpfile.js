var gulp = require('gulp')
var sass = require('gulp-ruby-sass')
//var connect = require('gulp-connect')
var browserify = require('browserify')
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream')

//gulp.task('connect', function () {
//	connect.server({
//		root: 'public',
//		port: 4000
//	})
//})



gulp.task('browserify', function() {
  // Grabs the app.js file
    return browserify('./app/app.js')
      // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.reload({
          stream: true
    }))
})

gulp.task('sass', function() {
	return sass('sass/style.sass')
		.pipe(gulp.dest('public/css'))
})
// ------------------Globbing---------------



gulp.task('watch', ['browserSync','browserify'], function() {

  gulp.watch('app/**/*.js',['browserify'])

  gulp.watch('sass/style.sass', ['sass'])

})

gulp.task('default', ['browserSync', 'watch'])



gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

gulp.task('sass', function() {
  return gulp.src('sass/**/*.sass') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


