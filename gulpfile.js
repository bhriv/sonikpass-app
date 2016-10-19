'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
	uglify =  require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	strip = require('gulp-strip-comments'),
	mainBowerFiles = require('main-bower-files'),
	browserSync = require('browser-sync');

/*********************************************/
/* Script Tasks */
/*********************************************/

// Set order for JS files
var vendorFiles = [
	'src/js/vendor/jquery-2.2.0.js',
	'src/js/vendor/Underscore.js',
	'src/js/vendor/consoleclass.js',
	'src/js/vendor/modernizer.js',
	'src/js/vendor/TweenMax.js',
	'src/js/vendor/TimelineMax.min.js',
	'src/js/vendor/ScrollMagic.js',
	'src/js/vendor/animation.gsap.js',
	'src/js/vendor/jquery.waypoints.min.js',
];

var customFiles = [
	'src/js/useful.js',
    'src/js/error-handling.js',
    'src/js/main.js',
];

gulp.task('vendors', function(){
	gulp.src(vendorFiles)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('public/js/vendor'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('vendors_production', function(){
	gulp.src(vendorFiles)
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/js/dist'))
		.pipe(browserSync.reload({stream:true}));
});


/* Version 1.0 task for main.js */
gulp.task('scripts', function(){
	gulp.src(customFiles)
		.pipe(concat('ui.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts_production', function(){
	gulp.src(customFiles)
		.pipe(concat('ui.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/js/dist'))
		.pipe(browserSync.reload({stream:true}));
});


/*********************************************/
/* Styles Tasks */
/*********************************************/

gulp.task('styles', function(){

	gulp.src('src/scss/style.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', gutil.log)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({stream:true}));

});

/*********************************************/
/* Misc Tasks */
/*********************************************/

gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir: './public'
		}
	})
});


gulp.task('images', function(){

	gulp.src('src/assets/**/*.{jpg,jpeg,png,gif,svg}')
		.pipe(imagemin({
			optimizationLevel: 3,
			progessive: true,
			interlaced: true
	    }))
	    .pipe(gulp.dest('public/assets'))
	    .pipe(browserSync.reload({stream:true}));

});

gulp.task('html', function(){

	return gulp.src('public/**/*html')
		.pipe(strip())
		.pipe(browserSync.reload({stream:true}));

});

/*********************************************/
/* Watch For Changes */
/*********************************************/

gulp.task('watch', function(){

	gulp.watch('public/**/*.html', ['html']);
	gulp.watch('src/**/*.scss', ['styles']);
	gulp.watch('src/**/*.js', ['scripts']);
	gulp.watch('src/**/*.{jpg,jpeg,png,gif,svg}', ['images']);


});

/*********************************************/
/* Gulp Commands */
/*********************************************/
// gulp.task('default', ['html', 'scripts', 'vendors', 'images', 'styles', 'browserSync', 'watch']);
gulp.task('default', ['html', 'scripts','scripts_production', 'vendors','vendors_production', 'images', 'styles', 'browserSync', 'watch']);
// gulp.task('frontend', ['vendors','ui','browserSync']);