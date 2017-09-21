var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 3000
    },
    ignore: ['./node-modules/**']
  })
  .on('restart', () =>{
      console.log('Restarting services due to file changes...');
  });
});
