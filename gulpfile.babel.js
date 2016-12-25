'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import jscs from 'gulp-jscs';
import inject from 'gulp-inject';
import nodemon from 'gulp-nodemon';

const jsPaths = ['*.js','src/**/*.js'];

gulp.task('styles', () => {
  return gulp.src(jsPaths)
          .pipe(jshint())
          .pipe(jshint.reporter('jshint-stylish',{
            verbose:true
          }))
          .pipe(jscs());
});

gulp.task('inject', ()=>{
    const wiredep = require('wiredep').stream;
    const options = {
      bowerJson: require('./bower.json'),
      directory: './public/lib',
      ignorePath: '../../public'
    };
    const injectSrc = gulp.src(['./public/css/*.css',
                                './public/js/*.js'],{read:false});
    const injectOptions = {
      ignorePath: '/public'
    };
    return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve',['styles','inject'], ()=>{
  const options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: jsPaths
  };

  return nodemon(options)
  .on('restart', (ev)=>{
    console.log('Restarting...');
  });

});
