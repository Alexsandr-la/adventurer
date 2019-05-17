const gulp         = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync').create(), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    newer        = require('gulp-newer'), //ограничение выборки для ускорения компиляции
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    babel = require('gulp-babel');



function sassf() {
    return gulp.src('./app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 12 versions','> 1%'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('./app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.stream()); // Обновляем CSS на странице при изменении
}

function js() {
    return gulp.src('app/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('app/dist/js'));
}


function watch(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }, tunnel: false
    });

    gulp.watch("./app/sass/**/*.sass", sassf);
    gulp.watch("./app/js/**/*.js", js);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('app/dist/js/**/*.js').on('change', browserSync.reload);
    //gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}

gulp.task('sassf', sassf);

gulp.task('watch', watch);

//gulp.task('build', build);

gulp.task('js', js);

gulp.task('default', watch);