var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var gulpJade = require('gulp-jade');

gulp.task('sass', function(){
	return gulp.src('./sass/main.scss') /*con q archivo va a trabajar*/
	.pipe(gulpSass())
	.pipe(gulp.dest('css')); /*ubicacion de destino*/
});

gulp.task('jade', function(){
 	return gulp.src('./jade/*.jade') /*con q archivo va a trabajar*/
 	.pipe(gulpJade())
	.pipe(gulp.dest('public'));/*ubicacion de destino*/
}); 

gulp.task('watch-sass',function(){
 return gulp.watch('./sass/main.scss', ['sass'])});

gulp.task('watch-jade',function(){
 return gulp.watch('./jade/*.jade', ['jade'])});

gulp.task('default',['watch-sass','watch-jade']);