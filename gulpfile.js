const run_sequence = require('run-sequence');
const gulp = require('gulp');
const maps = require('gulp-sourcemaps');
const tsc = require('gulp-typescript');
const del = require('del');

gulp.task('build:clean', (done) => {
    del(['build']).then((files) => {
        console.log('  Deleted files and folders:\n    ' + files.join('\n    '));
        done();
    }).catch((err) => {
        done(err);
    })
});

gulp.task('build:build', (done) => {
    run_sequence('build:clean', ['copy:test-data', 'exec:tsc'], done)
})

gulp.task('copy:test-data', () => {
    return gulp.src('test/data/**/*')
        .pipe(gulp.dest('build/test/data'));
})

gulp.task('exec:tsc', (done) => {
    var exec = require('child_process').exec;
    var path = require('path').join('.', 'node_modules', '.bin', 'tsc');

    exec(`${path} -p .`, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        done(err);
    });
})


gulp.task('build:test', (done) => {
    var tsproj = tsc.createProject('tsconfig.json');

    var files = gulp.src(['src/**/*.ts', 'test/**/*.ts']).pipe(maps.init());
    var result = files.pipe(tsproj());

    result.js
        .pipe(maps.write('.'))
        .pipe(gulp.dest((file) => {
            console.log(file.base);
            return file.base;
        }));

    done();
});

