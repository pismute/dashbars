'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')(
    {
        rename:{
            'gulp-6to5': 'to5'
        }
    });
var seq = require('run-sequence');

gulp.task('bump', function(){
    var _type = gulp.env.type || 'patch';
    return gulp.src(['./package.json',
                     './bower.json'])
        .pipe($.bump({type:_type, indent: 4 }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function(done){
    return seq('clean',
               'scripts',
               'lint',
               'test',
              done);
});

gulp.task('scripts', function(done){
    return seq('scripts:browser',
               'scripts:npm',
               done);
});

gulp.task('scripts:browser', function(){
    return gulp.src(['lib/**/*.js', '!lib/f.js'])
        .pipe($.using())
        .pipe($.to5())
        .pipe($.wrap('//<%= file.relative %>\n<%= contents %>\n'))
        .pipe($.concat('dashbars.js'))
        .pipe($.wrap({src:'lib/wrap.js.txt'}, {modules:'dash, p, s, n, d'}))
        .pipe(gulp.dest('dist/'))
        .pipe($.using())
        .pipe($.uglify())
        .pipe($.rename('dashbars.min.js'))
        .pipe(gulp.dest('dist/'))
        .pipe($.using());
});

gulp.task('scripts:npm', function(){
    return gulp.src('lib/**/*.js')
        .pipe($.using())
        .pipe($.using())
        .pipe($.wrap('//<%= file.relative %>\n<%= contents %>\n'))
        .pipe($.concat('index.js'))
        .pipe($.wrap({src:'lib/wrap.js.txt'}, {modules:'dash, p, s, n, d, f'}))
        .pipe(gulp.dest('dist/'))
        .pipe($.using());
});

gulp.task('clean', function(done) {
    require('del')('dist/', done);
});

gulp.task('lint', function(){
    return gulp.src(['lib/**/*.js'])
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
gulp.task('watch', ['default'], function(){
    gulp.watch('dist/**/*.js', ['default']);
});

gulp.task('publish', function(done){
    seq('publish:npm', done);
});

gulp.task('publish:npm', function (done) {
    require("child_process").spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});
