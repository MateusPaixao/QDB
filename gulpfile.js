const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const del = require('del');
const browserify = require('gulp-browserify');
const babelify = require('babelify');
const pug = require('gulp-pug');

const paths = {
  styles: {
    src: 'src/assets/scss/common/*.scss',
    dest: './dist/assets/css',
    srcWatch: 'src/assets/scss/**/*.scss',
  },
  scripts: {
    src: 'src/assets/js/common/*.js',
    dest: './dist/assets/js',
    srcWatch: 'src/assets/**/*.js',
  },
  htmls: {
    src: 'src/views/common/**/*.pug',
    dest: './dist/views/html',
  }
};

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
    .pipe(gulp.dest(paths.htmls.dest));
}
const htmls = () => {
  return gulp.src('src/views/html_templates/*.html')
    .pipe(gulp.dest(paths.htmls.dest));
}
const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(babel({
      presets: ["@babel/polyfill", "env"]
    }))
    .pipe(browserify({
      transform: ['babelify'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

const pluginsJs = () => {
  return gulp.src(
    ['node_modules/vtex-lazyload/dist/*.js']
  )
    .pipe(gulp.dest(paths.scripts.dest));
}

const watch = () => {
  gulp.watch(paths.styles.srcWatch, styles);
  gulp.watch(paths.scripts.srcWatch, scripts);
  gulp.watch('src/views/**/*', htmls, pugtranspile);
}


const build = gulp.series(gulp.parallel(styles, scripts, htmls, pugtranspile, watch));

// exports.pluginsJs = pluginsJs;
// exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.watch = watch;
exports.build = build;

exports.default = build;
