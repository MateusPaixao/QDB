//------------------------------ Config ----------------------------------
const storeName = 'qbbr';

const bases = {
    src: './src',
    build: './dist/vtex_speed/arquivos/'
}

//----------------------------- Modules ---------------------------------
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const babelify = require('babelify');
const browserify = require('gulp-browserify');
const browserSync   = require('browser-sync').create();
// const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const svgmin = require('gulp-svgmin');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");

const paths = {
  imgs: {
    src: 'src/assets/img/*.{png,gif,jpg}',
    dest: './dist/assets/img/',
    srcWatch: 'src/assets/img/*'
  },
  svgs: {
    src: 'src/assets/img/icon/*.svg',
    dest: './dist/assets/img/icon/',
    srcWatch: 'src/assets/img/icon/*'
  },
  styles: {
    src: ['src/assets/scss/common/*.scss', '!src/assets/scss/common/checkout6-custom.scss'],
    dest: './dist/assets/css/',
    qa: './qa/assets/css/',
    srcWatch: ['src/assets/scss/**/*.scss', '!src/assets/scss/**/checkout6-custom.scss'],
  },
  scripts: {
    src: ['src/assets/js/common/*.js', 'src/assets/js/common/*.jsx', '!src/assets/js/common/checkout6-custom.js'],
    dest: './dist/assets/js/',
    qa: './qa/assets/js/',
    srcWatch: ['src/assets/**/*.js','src/assets/**/*.jsx', '!src/assets/**/checkout6-custom.js'],
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
    .pipe(gulp.dest(paths.markup.dest));
}
const htmls = () => {
  return gulp.src(paths.markup.html)
    .pipe(gulp.dest(paths.markup.dest));
}

const minimg = () => {
  return gulp.src(paths.imgs.src)
      .pipe(imagemin())
      .pipe(gulp.dest(paths.imgs.dest))
      .pipe(gulp.dest('./dist/vtex_speed/arquivos/'));
};

const minsvg = () => {
  return gulp.src(paths.svgs.src)
      .pipe(svgmin())
      .pipe(gulp.dest(paths.svgs.dest))
      .pipe(gulp.dest('./dist/vtex_speed/arquivos/'));
};

const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulp.dest('./dist/vtex_speed/arquivos/'))
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
    .pipe(gulp.dest('./dist/vtex_speed/arquivos/'))
    .pipe(rename(function (path) {
      path.basename = "QA-" + path.basename
    }))
    .pipe(gulp.dest(paths.scripts.qa));
}

const checkoutStyles = () => {
  return gulp.src("src/assets/scss/common/checkout6-custom.scss")
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulp.dest('./dist/vtex_speed/files/'))
}

const checkoutScripts = () => {
  return gulp.src('src/assets/js/common/checkout6-custom.js')
    .pipe(babel())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(gulp.dest('./dist/vtex_speed/files/'))
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
          route: ['/files', '/arquivos'],
          dir: [bases.build + '/../files', bases.build]
      }]
  })
}

const watch = () => {
  gulp.watch(paths.styles.srcWatch, styles).on('change',browserSync.reload);
  gulp.watch(paths.scripts.srcWatch, scripts).on('change',browserSync.reload);

  gulp.watch('src/assets/scss/**/checkout6-custom.scss', checkoutStyles).on('change',browserSync.reload);
  gulp.watch('src/assets/**/checkout6-custom.js', checkoutScripts).on('change',browserSync.reload);

  gulp.watch('src/views/**/*', pugtranspile).on('change',browserSync.reload);
  gulp.watch('src/views/html/*', htmls).on('change',browserSync.reload);
  gulp.watch(paths.imgs.srcWatch, minimg).on('change',browserSync.reload);
  gulp.watch(paths.svgs.srcWatch, minsvg).on('change',browserSync.reload);
}

//------------------------------ Tasks -----------------------------
const build = gulp.series(gulp.parallel(sync, minimg, minsvg, styles, scripts, checkoutStyles, checkoutScripts, htmls, pugtranspile, watch));

// exports.pluginsJs = pluginsJs;
// exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.checkoutStyles = checkoutStyles;
exports.checkoutScripts = checkoutScripts;
exports.htmls = htmls;
exports.pugtranspile = pugtranspile;
exports.minimg = minimg;
exports.minsvg = minsvg;
exports.watch = watch;
exports.build = build;

exports.default = build;
