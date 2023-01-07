const { src, dest, watch, parallel } = require("gulp");
//css dependence
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
//Image dependence
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss") // identificar el archivo de SASS
    .pipe(plumber())
    .pipe(sass()) // Compilarlo
    .pipe(dest("build/css")); // Almacenarla en el disco duro

  done(); // Callback que avisa a gulp cuando llegamos al final
}

//images - optimization/processing
function images(done) {
  const options = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(options)))
    .pipe(dest("build/img"));

  done();
}

function webpVersion(done) {
  const options = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(webp(options))
    .pipe(dest("build/img"));

  done();
}

function avifVersion(done) {
  const options = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(avif(options))
    .pipe(dest("build/img"));

  done();
}

//js
function javascript(done) {

  src("src/js/**/*.js")
    .pipe(dest("build/js"));

  done();
}

//dev
function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);

  done();
}

exports.css = css;
exports.js = javascript;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = avifVersion;
exports.dev = parallel(images, webpVersion, avifVersion, javascript, dev);
