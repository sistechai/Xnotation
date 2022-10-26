var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('concat', function () {
    return gulp.src('build/main.js', {sourcemaps: true})
       .pipe(uglify())
       .pipe(concat('bundle.js'))
       .pipe(gulp.dest('build/assets/js/'));
 });

 gulp.task('assets', function(){
    gulp.src('src/assets/**/*').pipe(gulp.dest('build/assets/'));
    gulp.src('src/storage/**/*').pipe(gulp.dest('build/storage/'));
    return gulp.src('src/index.html').pipe(gulp.dest('build/'));
});

gulp.task('build', gulp.series('concat', 'assets'));