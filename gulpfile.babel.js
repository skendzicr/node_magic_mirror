'use strict';

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import jscs from 'gulp-jscs';
import inject from 'gulp-inject';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import clean from 'gulp-clean';

const jsPaths = ['*.js','src/**/*.js'];
const sassPaths = ['*.scss','src/**/*.scss'];

// gulp.task('clean',()=>{
//   return gulp.src('public/**')
//   .pipe(clean({force:true}))
// })

gulp.task('babel',()=>{
  return gulp.src('src/js/client.js')
  .pipe(babel({presets: ['es2015']}))
  .pipe(gulp.dest('public/js/'))
})

gulp.task('sass', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css/'));
});

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

gulp.task('serve',['babel','sass','styles','inject'], ()=>{
  const options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    watch: [jsPaths,sassPaths]
  };

  return nodemon(options)
  .on('restart', (ev)=>{
    console.log('Restarting...');
  });

});
