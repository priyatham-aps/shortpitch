var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var less = require("gulp-less");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var proxy = require("http-proxy-middleware");
var vfs = require('vinyl-fs');

var jsCompileFn = function(src) {
	var babelOpts = {
		presets: ['latest', "react", "stage-2"],
		"plugins": [
			["transform-es2015-modules-systemjs"]
		]
	}

	return function() {
		return gulp.src(src)
		.pipe(watch(src))
		.pipe(sourcemaps.init())
		.pipe(babel(babelOpts))
		// .pipe(concat("all.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("dist/js"));
	}
}

gulp.task("html", function() {
	return gulp.src("src/index.html")
	.pipe(watch("src/index.html"))
	.pipe(gulp.dest("dist"));
});
gulp.task("img", function() {
	return gulp.src("src/assets/**")
	.pipe(watch("assets"))
	.pipe(gulp.dest("dist/assets"));
});

gulp.task("less", function() {
	return gulp.src("src/less/app.less")
	.pipe(watch("src/less/app.less"))
	.pipe(sourcemaps.init())
	.pipe(less({
		paths: [
			"jspm_packages/npm",
			"jspm_packages/github"
		]
	}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("dist/css"));
});

gulp.task("js", jsCompileFn([
	"src/js/**/*.js",
	"!src/js/fbs/**/*.js"
]));

gulp.task("jsx", jsCompileFn("src/js/**/*.jsx"));

gulp.task("fbs", function() {
	return gulp.src("src/js/fbs/**/*")
	.pipe(watch("src/js/fbs/**/*"))
	.pipe(gulp.dest("dist/js/fbs"));
});

gulp.task("vendor", function() {
	return gulp.src("_vendor/**/*")
	.pipe(watch("_vendor/**/*"))
	.pipe(gulp.dest("dist/vendor"));
});
gulp.task("fonts", function() {
	return gulp.src("src/less/fonts/**/*")
	.pipe(gulp.dest("dist/css/fonts/"));
});

gulp.task("link_jspm", function() {
	return vfs.src(['config.js', 'jspm_packages'], {followSymlinks: false})
	.pipe(vfs.symlink('dist'));
});

gulp.task("connect", function() {
	return connect.server({
		root: ["dist/"],
		port: 9001,
		middleware: function (connect, opt) {
			return[
				proxy('/api', {
						target: 'http://localhost:8000',
						changeOrigin:true
					}),
				proxy('/stream', {
						target: 'http://localhost:8000',
						changeOrigin:true,
						ws:true
					}),
				proxy('/control', {
						target: 'http://localhost:8000',
						changeOrigin:true,
						ws:true
					})
			]
		}
	});
});

gulp.task("default", ["html","img", "less", "link_jspm", "js", "jsx", "fbs", "vendor","fonts","connect"]);
