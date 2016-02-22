var gulp = require("gulp"),
    requirejsOptimize = require("gulp-requirejs-optimize"),
    requireDistConfig = require("../src/requirejs.conf.json"),
    clean = require("gulp-clean");

gulp.task("scripts-dist", ["clean-scripts"], function () {
    return gulp.src(paths.src + "js/main.js")
        .pipe(requirejsOptimize(requireDistConfig))
        .pipe(gulp.dest(paths.dist + "js"));
});

gulp.task("clean-scripts", function () {
    return gulp.src(paths.dist + "**/*.js", {read: false})
        .pipe(clean());
});