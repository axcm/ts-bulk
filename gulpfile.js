const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

let paths = {
  base: './',
  js: 'ts-bulk.js'
};

srcjs = paths.base + paths.js;

gulp.task('uglify', function (){
  return gulp.src(srcjs)
  .pipe(babel({
    "presets": ["@babel/preset-env"]
  }))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(paths.base));
});

// gulp.task('default', ['uglify']);
gulp.task('default', gulp.series(gulp.parallel('uglify')));
