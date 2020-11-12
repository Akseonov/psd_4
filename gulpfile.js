var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
    });
    gulp.watch("app/sass/*.sass", gulp.parallel('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function(){
    return gulp.src('app/sass/style.sass')
        .pipe(sourcemaps.init())
        .pipe(sass()) // Конвертируем Sass в CSS через gulp-sass
        .pipe(prefix())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('serv', gulp.parallel('browser-sync'));