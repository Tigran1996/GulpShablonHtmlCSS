var gulp = require('gulp');
var concat = require('gulp-concat');
var minify_css = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');
const { watch } = require('gulp');

const paths = {
    scripts: {
        src: '../src/',
        dest: '../src/build/'
    }
};


gulp.task('include-html',async function(){
    gulp.src([
        '../src/*.html',
        '!../src/header.html', // ignore
        '!../src/footer.html' // ignore
    ])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
})


gulp.task('scripts', async  function() {
    gulp.src(
        [
            '../src/js/libs/jquery-3.5.1.js',
            '../src/js/libs/select2.min.js',
            '../src/js/libs/bootstrap.min.js',
            '../src/js/libs/jquery.validate.min.js',
            '../src/js/jquery-ui/jquery-ui.min.js',
            '!../src/js/index.js',
        ])
        .pipe(concat('compressed.js'))
        .pipe(gulp.dest('../src/build/js/'))
});

gulp.task('compress', function() {
    gulp.src(['../src/js/compressed.js'])
    //.pipe(minify({ext:{
    // min:'.min.js'
    // }}))
        .pipe(gulp.dest('../src/js/'))
});
gulp.task('compress-css',async  function() {
    gulp.src(
        [
            '../src/css/bootstrap.min.css',
            '../src/css/select2.min.css',
            '../src/css/select2-bootstrap.min.css',
            '../src/css/style.css',
        ]
    )
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minify_css())
        .pipe(concat('compressed.css'))
        .pipe(gulp.dest('../src/build/css/'))
});


gulp.task('watch', function() {
    gulp.watch(['../src/js/*.js'], gulp.series('scripts'));
    gulp.watch(['../src/css/*.css'], gulp.series('compress-css'));
    gulp.watch(['../src/*.html'], gulp.series('include-html'));
});
