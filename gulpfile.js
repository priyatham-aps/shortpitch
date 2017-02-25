var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var less = require("gulp-less");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var vfs = require('vinyl-fs');

var jsCompileFn = function(src) {
	var babelOpts = {
		presets: ['env', "react"]
	}

	return function() {
		return gulp.src(src)
		.pipe(watch(src))
		.pipe(sourcemaps.init())
		.pipe(babel(babelOpts))
		// .pipe(concat("all.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist"));
	}
}

gulp.task("html", function() {
	return gulp.src("src/index.html")
	.pipe(watch("src/index.html"))
	.pipe(gulp.dest("dist"));
});

gulp.task("less", function() {
	return gulp.src("src/less/app.less")
	.pipe(watch("src/less/app.less"))
	.pipe(sourcemaps.init())
	.pipe(less({
		paths: [
			"node_modules"
		]
	}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("dist/css"));
});

gulp.task("js", jsCompileFn("src/**/*.js"));

gulp.task("jsx", jsCompileFn("src/**/*.jsx"));

gulp.task("connect", function() {
	return connect.server({
		root: ["dist/"],
		port: 9001
	});
});

gulp.task("default", ["html", "less", "js", "jsx", "connect"]);
