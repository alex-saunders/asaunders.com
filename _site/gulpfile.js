const gulp        = require('gulp');
const sass        = require('gulp-sass');
const rename      = require("gulp-rename");
const postcss     = require('gulp-postcss');
const exec        = require('gulp-exec');
const connect     = require('gulp-connect');
const nodemon     = require('gulp-nodemon');  
const livereload  = require('gulp-livereload');
const gls         = require('gulp-live-server');
const imagemin    = require('gulp-imagemin');
const rev         = require('gulp-rev');
const clean       = require('gulp-clean');
const rollup      = require('gulp-better-rollup');

const json          = require('rollup-plugin-json');
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
  jekyll: {
    target: './',
    watch: ['_includes/**/*', '_layouts/**/*', '_posts/**/*', 
    '_plugins/**/*', '_config.yml', 'posts/**/*', 'sw.js']
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

gulp.task('rollup', ['css', 'imagemin'], () => {
  gulp.src(paths.rollup.target)
    .pipe(rollup({
      plugins: [
        json({}),
      ],
    }, 'cjs'))
    .pipe(rename(path => { path.basename = 'sw.bundle' }))
    .pipe(gulp.dest('./'));
});

gulp.task('jekyll', ['css', 'imagemin'], () => {
  return gulp.src(paths.jekyll.target)
    .pipe(exec('bundle exec jekyll build'))
    .pipe(livereload());
});

gulp.task('server', function (){  
  return nodemon({
      'script': 'server.js',
      'watch' : ['server.js', 'sw.js', '_site/assets/**/*']
  });
});

gulp.task('watch', ['server'], () => {
  livereload.listen({
    port: 9090
  });
  gulp.watch(paths.sass.watch, ['jekyll']);
  gulp.watch(paths.imagemin.watch, ['jekyll']);
  gulp.watch(paths.jekyll.watch, ['jekyll']);
});

gulp.task('default', ['jekyll'], function () {
  var server = gls('server.js', {env: { NODE_ENV: 'production' }}, false);
  return server.start();
})
gulp.task('serve', ['jekyll', 'server', 'watch']);
