var gulp = require('gulp');



gulp.task( 'default', function() {
    // place code for your default task here
    console.log( "> hello world gulp. " );

    var git = require('gulp-git');

    // gulp.task('add', function(){
    return gulp.src('.')
            .pipe(git.add({args: '--all'}))
            .pipe(git.commit( 'initial commit', {args: '-a'}) )
            .pipe(git.push('origin', 'master',
                    function (err) {
                        if (err) throw err;
                    }));
        ;
    // });
});