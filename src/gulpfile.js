var gulp = require('gulp'),
sass = require('gulp-sass'),
cleanCSS = require('gulp-clean-css'),
autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./styles/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles/css'));
});

gulp.task('minify-css', () => {
    return gulp.src('./styles/css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8', inline:'local'}))
      .pipe(gulp.dest('./styles/css'));
  });

gulp.task('prefixer', () =>
  gulp.src('./styles/css/main.css')
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(gulp.dest('./styles/css'))
);

gulp.task('watch', function () {
  gulp.watch('./styles/scss/*.scss', gulp.series('sass', 'prefixer', 'minify-css'));
});
