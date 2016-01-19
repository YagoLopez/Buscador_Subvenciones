(function(){
    'use strict';    
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        less = require('gulp-less'),
        rename = require('gulp-rename'),
        header = require('gulp-header'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        minifyCSS = require('gulp-minify-css'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        jade = require('gulp-jade'),
        fs = require('fs'),
        paths = {
            root: './',
            build: 'build/',
            dist: 'dist/',
            demo: 'demo/',
            source: 'src/',
        },
        plugin = {
            filename: 'framework7.3dpanels',
            pkg: require('./bower.json'),
            banner: [
                '/**',
                ' * <%= pkg.name %> <%= pkg.version %>',
                ' * <%= pkg.description %>',
                ' * ',
                ' * <%= pkg.homepage %>',
                ' * ',
                ' * Copyright <%= date.year %>, <%= pkg.author %>',
                ' * The iDangero.us',
                ' * http://www.idangero.us/',
                ' * ',
                ' * Licensed under <%= pkg.license.join(" & ") %>',
                ' * ',
                ' * Released on: <%= date.month %> <%= date.day %>, <%= date.year %>',
                ' */',
                ''].join('\n'),
            date: {
                year: new Date().getFullYear(),
                month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
                day: new Date().getDate()
            }
        };
        
    gulp.task('jade', function (cb) {
        gulp.src(paths.demo + '*.jade')
           .pipe(jade({
                pretty: true
            }))
            .pipe(gulp.dest(paths.demo))
            .pipe(connect.reload());
        cb();
    });
    gulp.task('scripts', function (cb) {
        gulp.src(paths.source + plugin.filename + '.js')
            .pipe(header(plugin.banner, { pkg : plugin.pkg, date: plugin.date } ))
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(gulp.dest(paths.build))
            .pipe(connect.reload());
        cb();
    });
    gulp.task('styles', function (cb) {
        gulp.src(paths.source + plugin.filename + '.less')
            .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
            }))
            .pipe(header(plugin.banner, { pkg : plugin.pkg, date: plugin.date }))
            .pipe(gulp.dest(paths.build))
            .pipe(connect.reload());
        cb();
    });
    gulp.task('build', ['jade', 'scripts', 'styles'], function (cb) {
        cb();
    });

    gulp.task('dist', function () {
        gulp.src([paths.build + plugin.filename + '.js'])
            .pipe(gulp.dest(paths.dist))
            .pipe(uglify())
            .pipe(header(plugin.banner, { pkg : plugin.pkg, date: plugin.date }))
            .pipe(rename(function(path) {
                path.basename = plugin.filename + '.min';
            }))
            .pipe(gulp.dest(paths.dist));

        gulp.src(paths.build + plugin.filename + '.css')
            .pipe(gulp.dest(paths.dist))
            .pipe(minifyCSS({
                advanced: false,
                aggressiveMerging: false,
            }))
            .pipe(header(plugin.banner, { pkg : plugin.pkg, date: plugin.date }))
            .pipe(rename(function(path) {
                path.basename = plugin.filename + '.min';
            }))
            .pipe(gulp.dest(paths.dist));
    });

    gulp.task('watch', function () {
        gulp.watch(paths.source + '*.js', [ 'scripts' ]);
        gulp.watch(paths.source + '*.less', [ 'styles' ]);
        gulp.watch(paths.demo + '*.*', function () {
            gulp.src(paths.demo)
                .pipe(connect.reload());
        });
    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ paths.root ],
            livereload: true,
            port:'3000'
        });
    });
    
    gulp.task('open', function () {
        return gulp.src(paths.demo + 'index.html').pipe(open({ uri: 'http://localhost:3000/' + paths.demo + 'index.html'}));
    });

    gulp.task('server', [ 'watch', 'connect', 'open' ]);

    gulp.task('default', [ 'server' ]);
})();