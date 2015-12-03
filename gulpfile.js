var gulp = require('gulp');

var cssnext = require("gulp-cssnext")
var minifyHTML = require('gulp-minify-html');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

gulp.task("stylesheets", function() {
  gulp.src("css/*.css")
    .pipe(sourcemaps.init())
    .pipe(cssnext({
        compress: true
    }))
    .pipe(postcss([ 
      autoprefixer({ 
        browsers: ['last 2 versions'] 
      }) 
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"))
});

gulp.task('html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});



//Gulp watch directorys
 gulp.task('watch', function () {
 	gulp.watch('css/*.css', ['stylesheets']);
 	gulp.watch('*.html', ['html']);
// 	gulp.watch('./assets/images/src/**/*', ['assetimage']);
// 	gulp.watch('./assets/scss/critical/*.scss', ['critical']);
 });



// default gulp task

gulp.task('default', ['stylesheets', 'html'], function() {});
