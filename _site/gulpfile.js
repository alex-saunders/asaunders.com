const gulp        = require('gulp');
const sass        = require('gulp-sass');
const rename      = require("gulp-rename");
const postcss     = require('gulp-postcss');
const exec        = require('gulp-exec');
const connect     = require('gulp-connect');
const livereload  = require('gulp-livereload');
const imagemin    = require('gulp-imagemin');
const rev         = require('gulp-rev');
const revReplace  = require('gulp-rev-replace');
const clean       = require('gulp-clean');
const rollup      = require('gulp-better-rollup');

const json          = require('rollup-plugin-json');
const resolve       = require('rollup-plugin-node-resolve');
const commonjs      = require('rollup-plugin-commonjs');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');

const paths = {
  sass: {
    target: './assets/src/scss/styles.scss',
    dest: './assets/dist/static/css',
    watch: './assets/src/scss/**/*',
    rev: 'css.json'
  },
  imagemin: {
    target: './assets/src/images/**/*',
    dest: './assets/dist/static/images',
    watch: './assets/src/images/**/*',
    rev: 'images.json'
  },
  rollup: {
    target: './sw.js',
    watch: ['./sw.js', './generate-revmap.js']
  },
  jekyll: {
    target: './',
    watch: ['_includes/**/*', '_layouts/**/*', '_posts/**/*', '_config.yml', 'posts/**/*', 'assets/dist/**/*', 'sw.bundle.js']
  },
  rev: {
    manifest: './_data/assets'
  }
}

gulp.task('clean:css', () => {
  return gulp.src(paths.sass.dest, {read: false})
    .pipe(clean());
});

gulp.task('clean:images', () => {
  return gulp.src(paths.imagemin.dest, { read: false })
    .pipe(clean());
})

gulp.task('css', ['clean:css'], () => {
  var plugins = [
      autoprefixer({browsers: ['last 4 versions']}),
      cssnano()
  ];

  return gulp.src(paths.sass.target)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(rename(path => { path.basename = 'main' }))
    .pipe(rev())
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(rev.manifest(paths.sass.rev))
    .pipe(gulp.dest(paths.rev.manifest));
});

gulp.task('imagemin', ['clean:images'], () => {
  return gulp.src(paths.imagemin.target)
    .pipe(imagemin())
    .pipe(rev())    
    .pipe(gulp.dest(paths.imagemin.dest))
    .pipe(rev.manifest(paths.imagemin.rev))
    .pipe(gulp.dest(paths.rev.manifest));
});

gulp.task('generate-revmap', ['css', 'imagemin'], () => {
  return gulp.src('./')
    .pipe(exec('node generate-revmap'))
    .pipe(exec.reporter())
});

gulp.task('rollup', ['generate-revmap'], () => {
  gulp.src(paths.rollup.target)
    .pipe(rollup({
      plugins: [
        json({}),
      ],
    }, 'cjs'))
    .pipe(rename(path => { path.basename = 'sw.bundle' }))
    .pipe(gulp.dest('./'));
});

gulp.task('jekyll', () => {
  return gulp.src(paths.jekyll.target)
    .pipe(exec('bundle exec jekyll build'))
    .pipe(exec.reporter())
    .pipe(livereload());
});

gulp.task('connect', () => {
  connect.server({
    root: '_site',
    host: 'localhost',
    port: 8080,
    livereload: {
      port: 9090
    }
  });
});

gulp.task('watch', () => {
  livereload.listen({
    port: 9090
  });
  gulp.watch(paths.sass.watch, ['rollup']);
  gulp.watch(paths.imagemin.watch, ['rollup']);
  gulp.watch(paths.rollup.target, ['rollup']);
  gulp.watch(paths.jekyll.watch, ['jekyll']);
});

gulp.task('default', ['css', 'imagemin', 'rollup', 'jekyll', 'connect', 'watch']);
