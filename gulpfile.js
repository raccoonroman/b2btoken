"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var htmlmin = require("gulp-htmlmin");
var del = require("del");
var uglify = require("gulp-uglify");


gulp.task("sprite", function () {
  return gulp.src("src/img/sprite/*.svg")
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [{ removeViewBox: false }],
      })
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () { // не тестив
  return gulp.src("src/img/**/*.{gif,png,jpg,jpeg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
    ]))
    .pipe(gulp.dest("src/img"));
});

gulp.task("webp", function () { // не тестив
  return gulp.src("src/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("src/img"));
});

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer() // autoprefixer({browsers: ['last 2 version']}),
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))

    .pipe(server.stream());
});


gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(htmlmin())
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function () {
 return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "src/fonts/**/*.{woff,woff2}",
      "src/img/*.*", // маска *.* не позволяет копировать папки sprite-svg
    ], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("src/sass/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
  gulp.watch("src/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("src/fonts/**/*.{woff,woff2}", gulp.series("copy", "refresh"));
  gulp.watch("src/img/**/*.{gif,png,jpg,jpeg}", gulp.series("copy", "refresh"));
  gulp.watch("src/img/sprite/*.svg", gulp.series("sprite", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "js",
  "html"
));

gulp.task("start", gulp.series("build", "server"));
