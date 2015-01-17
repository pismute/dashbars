'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var seq = require('run-sequence');

gulp.task('default', function(done){
    return seq('lint',
               'test',
              done);
});

var files = ['lib/**/*.js', 'test/**/*.js'];

gulp.task('lint', function(){
    return gulp.src(files)
        .pipe($.cached('lint'))
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'));
});

gulp.task('test', function() {
    return gulp.src('test/**/*-test.js')
        .pipe($.using())
        .pipe($.mocha({
            reporter: 'spec'
        }));
});

// Watch
gulp.task('watch', ['default'], function(done){

    seq('default',
        done);

    gulp.watch(files, ['lint', 'test']);
});

gulp.task('publish', function(done){
    seq('npm', done);
});

gulp.task('npm', function (done) {
    require("child_process").spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});
