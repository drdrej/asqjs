var gulp = require('gulp');



gulp.task( 'default', function() {
    // place code for your default task here
    console.log( "> hello world gulp. " );

    var git = require('gulp-git');
    var bump = require('gulp-bump');
    var tagVersion = require('gulp-tag-version');

    gulp.src('.')
        .pipe(git.add({args: '--all'}))
        .pipe(git.commit( 'publishers commit', {args: '-a'}) );

    gulp.src('./package.json')
        .pipe(bump({type: minor}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('increment minor version'))
        .pipe(tagVersion());

    git.push('origin', 'master',
                    function (err) {
                        if (err) throw err;
                    });

});