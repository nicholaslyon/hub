const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');
const notifier = require('node-notifier');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const log = require('fancy-log');
const reload = browserSync.reload;

// configuration
const config = {
  scripts: {
    src: './src/javascript/index.js',
    dest: 'dist/javascript',
    watch: 'src/javascript/**/*',
  },
  styles: {
    src: 'src/css/main.scss',
    dest: 'dist/css',
    watch: 'src/css/**/*',
    browsers: ['last 1 version'],
  },
  dest: 'dist',
};

// clean
gulp.task('clean', del.bind(null, [config.dest]));


// scripts
const webpackConfig = require('./webpack.config')(config);

gulp.task('scripts', (done) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      log.error(err());
    }
    const result = stats.toJson();
    if (result.errors.length) {
      result.errors.forEach((error) => {
        log.error(error);
        notifier.notify({
          title: 'JS Build Error',
          message: error,
        });
      });
    }
    done();
  });
});

// SASS styles
gulp.task('styles', () =>
 gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: './node_modules',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: config.styles.browsers,
    }))
    .pipe(gulpif(!config.isDev, cssnano({ autoprefixer: false })))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(config.isDev, reload({ stream: true }))));

// TODO - copy index file to dist

// server
gulp.task('serve', () => {
  browserSync({
    server: {
      baseDir: config.dest,
    },
    notify: false,
    logPrefix: 'BrowserSync',
  });

  gulp.task('styles:watch', ['styles']);
  gulp.watch(config.styles.watch, ['styles:watch']);

  gulp.task('scripts:watch', ['scripts'], reload);
  gulp.watch(config.scripts.watch, ['scripts:watch']);
});

// build
gulp.task('build', ['clean', 'scripts', 'styles']);

// dev build setting
gulp.task('development', [], () => {
  config.isDev = true;
});

