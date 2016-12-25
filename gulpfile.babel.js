'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import jscs from 'gulp-jscs';

const jsPaths = ['*.js','src/**/*.js'];

gulp.task('styles', () => {
  return gulp.src(jsPaths)
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish',{
            verbose:true
          }))
          .pipe(jscs());
});
