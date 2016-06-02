var gulp = require('gulp');
var nodemon = require('gulp-nodemon')
var exec = require('child_process').exec;

gulp.task('start-mysql', runCommand('mysql.server start'));
gulp.task('stop-mysql', runCommand('mysql.server stop'));

gulp.task('start-mongo', runCommand('mongod'));

gulp.task('npm-test', runCommand('npm test'));

gulp.task('start-server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js',
    stdout: false
  }).on('readable', function () {
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', ['start-mongo', 'start-mysql', 'start-server']);
gulp.task('stop', ['stop-mysql']);
gulp.task('test', ['start-mongo', 'npm-test']);

function runCommand(command) {
  return function(cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}
