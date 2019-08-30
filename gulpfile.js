//------------------------------ Config ----------------------------------
const storeName = 'qbbr';

const bases = {
    src: './src',
    build: './dist/vtex_speed'
}

//----------------------------- Modules ---------------------------------
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('gulp-browserify');
const browserSync   = require('browser-sync').create();
// const del = require('del');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");

const paths = {
  styles: {
    src: 'src/assets/scss/common/*.scss',
    dest: './dist/assets/css/',
    qa: './qa/assets/css/',
    srcWatch: 'src/assets/scss/**/*.scss',
  },
  scripts: {
    src: ['src/assets/js/common/*.js', 'src/assets/js/common/*.jsx'],
    dest: './dist/assets/js/',
    qa: './qa/assets/js/',
    srcWatch: ['src/assets/**/*.js','src/assets/**/*.jsx'],
  },
  markup: {
    pug: 'src/views/common/*/*.pug',
    html: 'src/views/html/*.html',
    dest: './dist/views/html',
  }
};

//---------------------------- Development -------------------------------
// const clean = () => {
//   return del(['dist']);
// }

const pugtranspile = () => {
  return gulp.src([
    paths.markup.pug,
    'src/views/common/_layouts/*.pug',
    'src/views/common/_partials/*.pug',
  ])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(paths.htmls.dest));
}
const htmls = () => {
  return gulp.src('src/views/html/*.html')
    .pipe(gulp.dest(paths.htmls.dest));
}
const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulp.dest('./dist/vtex_speed'))
    .pipe(rename(function (path) {
      path.basename = "QA-" + path.basename
    }))
    .pipe(gulp.dest(paths.styles.qa));
}

const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(gulp.dest('./dist/vtex_speed'))
    .pipe(rename(function (path) {
      path.basename = "QA-" + path.basename
    }))
    .pipe(gulp.dest(paths.scripts.qa));
}

const pluginsJs = () => {
  return gulp.src(
    ['node_modules/vtex-lazyload/dist/*.js']
  )
    .pipe(gulp.dest(paths.scripts.dest));
}

function sync(){
  return browserSync.init({
      open: true,
      https: true,
      host: storeName  + '.vtexlocal.com.br',
      startPath: '/admin/login/',
      proxy: 'https://' + storeName  + '.vtexcommercestable.com.br',
      serveStatic: [{
          route: '/arquivos',
          dir: [bases.build]
      }]
  })
}

const watch = () => {
  gulp.watch(paths.styles.srcWatch, styles).on('change',browserSync.reload);
  gulp.watch(paths.scripts.srcWatch, scripts).on('change',browserSync.reload);
  gulp.watch('src/views/**/*', pugtranspile).on('change',browserSync.reload);
  gulp.watch('src/views/html/*', htmls).on('change',browserSync.reload);
  gulp.watch(paths.imgs.srcWatch, minimg).on('change',browserSync.reload);
  gulp.watch(paths.svgs.srcWatch, minsvg).on('change',browserSync.reload);
}

//------------------------------ Tasks -----------------------------
const build = gulp.series(gulp.parallel(sync,styles, scripts, htmls, pugtranspile, watch));

// exports.pluginsJs = pluginsJs;
// exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.pugtranspile = pugtranspile;
exports.minimg = minimg;
exports.minsvg = minsvg;
exports.watch = watch;
exports.build = build;

exports.default = build;
