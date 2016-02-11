var gulp = require('gulp'),
    inject = require('gulp-inject'),
    clean = require('gulp-clean'),
    less = require('gulp-less');

require('require-dir')('./gulp');

gulp.task("less", ["clean-css"], function () {
    return gulp.src(paths.src + "/less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task("clean-css", function () {
    return gulp.src(paths.dist + "css/*.css", {read: false})
        .pipe(clean());
});

gulp.task("html-index", function () {
    return gulp.src(paths.src + "index.html")
        .pipe(gulp.dest(paths.dist));
});

gulp.task("vendor-js", ["clean-vendor-js"], function () {
    return gulp.src(paths.src + "js/vendor/**/*.js")
        .pipe(gulp.dest(paths.dist + "js/vendor"));
});

gulp.task("vendor-css", function () {
    return gulp.src(paths.src + "css/vendor/**/*.*")
        .pipe(gulp.dest(paths.dist + "css/vendor"));
});

gulp.task("clean-vendor-js", function () {
    return gulp.src(paths.dist + "js/vendor/*.js", {read: false})
        .pipe(clean());
});

gulp.task("build", ["build-tasks"]);
gulp.task("build-tasks", ["vendor-js", "vendor-css", "scripts-dist", "less", "html-index"]);

