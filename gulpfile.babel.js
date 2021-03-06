import gulp from 'gulp';
import clean from 'gulp-clean';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import babelify from 'babelify';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

const paths = {
    src:  { js: './src/index.js' },
    dest: { js: './dist', example: './example' }
};

gulp.task('clean', function () {
  return gulp.src(paths.dest.js)
    .pipe(clean({force: true}));
});

gulp.task('build', ['clean'], ()=> {
  return browserify({ entries: paths.src.js, standalone: 'backand', debug: true })
  	.transform("babelify")
    .bundle()
    .pipe(source('backand.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.dest.js))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('backand.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dest.js))
    .pipe(gulp.dest(paths.dest.example))
});

gulp.task('watch', ()=> {
  gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['build']);
