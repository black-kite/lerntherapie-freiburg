'use strict';
var gulp = require('gulp');
var del = require('del');
var cssnext = require("gulp-cssnext")
var minifyHTML = require('gulp-minify-html');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var ghPages = require('gulp-gh-pages');



gulp.task('clean', function() {
  return del([
    '.publish/**/*',
    'dist/**/*',
    '!dist/CNAME',
    '!dist/.gitignore'
    ]);
});


gulp.task("stylesheets", ['clean'], function() {
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
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dist/css"))
});

gulp.task('html', ['clean'], function() {
  var opts = {
    conditionals: true,
    spare:true
  };
  return gulp.src('*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('font', ['clean'], function() {
  gulp.src('./font/**/*')
    .pipe(gulp.dest('./dist/font'))
});

gulp.task('img', ['clean'], function() {
  gulp.src('./img/**/*')
    .pipe(gulp.dest('./dist/img'))
});
gulp.task('js', ['clean'], function() {
  gulp.src('./js/**/*')
    .pipe(gulp.dest('./dist/js'))
});

//Gulp watch directorys
 gulp.task('watch', function () {
 	gulp.watch('css/*.css', ['default']);
 	gulp.watch('*.html', ['default']);
// 	gulp.watch('./assets/images/src/**/*', ['assetimage']);
// 	gulp.watch('./assets/scss/critical/*.scss', ['critical']);
 });

 gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// default gulp task

gulp.task('default', ['stylesheets', 'html', 'font', 'img', 'js'], function() {});
