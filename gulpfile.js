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
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const svgmin = require('gulp-svgmin');
const uglify = require('gulp-uglify');

const paths = {
  styles: {
    src: 'src/assets/scss/common/*.scss',
    dest: './dist/assets/css',
    srcWatch: 'src/assets/scss/**/*.scss',
  },
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
  scripts: {
    src: 'src/assets/js/common/*.js',
    dest: './dist/assets/js',
    srcWatch: 'src/assets/**/*.js',
  },
  htmls: {
    src: 'src/views/common/**/*.pug',
    dest: './dist/views/html_templates',
  }
};

//---------------------------- Development -------------------------------
// const clean = () => {
//   return del(['dist']);
// }

const pugtranspile = () => {
  return gulp.src([
    paths.htmls.src,
    '!src/views/common/_layouts/*.pug',
    '!src/views/common/_partials/*.pug',
  ])
    .pipe(pug({
      pretty: false,
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
      .pipe(gulp.dest('./dist/vtex_speed'));
};

const minsvg = () => {
  return gulp.src(paths.svgs.src)
      .pipe(svgmin())
      .pipe(gulp.dest(paths.svgs.dest))
      .pipe(gulp.dest('./dist/vtex_speed'));
};

const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(gulp.dest('./dist/vtex_speed'));
}

const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(babel({
      presets: ["@babel/polyfill", "env"]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(gulp.dest('./dist/vtex_speed'));
}

const pluginsJs = () => {
  return gulp.src(
    ['node_modules/vtex-lazyload/dist/*.js']
  )
    .pipe(gulp.dest(paths.scripts.dest));
}

function sync(){
  browserSync.init({
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
  gulp.watch('src/views/**/*', htmls, pugtranspile).on('change',browserSync.reload);
}

//------------------------------ Tasks -----------------------------
const build = gulp.series(gulp.parallel(sync, minimg, minsvg, styles, scripts, htmls, pugtranspile, watch));

// exports.pluginsJs = pluginsJs;
// exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.watch = watch;
exports.build = build;

exports.default = build;
