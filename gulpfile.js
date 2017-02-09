/**
 * Created by ���� on 2017/2/8.
 */
	/*
	1.less���� ѹ�� �ϲ�
	2.js�ϲ� ѹ�� ����
	3.img����
	4.htmlѹ��
	*/
//��gulpfile��������gulp������Ϊ������ṩ��һЩAPI
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

//1.less���� ѹ�� �ϲ�û�б�Ҫ��һ��Ԥ����css�����Ե���
gulp.task('style',function(){
	gulp.src(['src/style/*.less','!src/style/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/style'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//2.js�ϲ� ѹ������
gulp.task('script',function(){
	gulp.src('src/script/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/script'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//3.ͼƬ����
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
//4.htmlѹ��
 gulp.task('html',function(){
	 gulp.src('src/*.html')
		 .pipe(htmlmin({
			 collapseWhitespace:true,
			 removeComments:true
		 }))
		 .pipe(gulp.dest('dist'))
		 .pipe(browserSync.reload({
			 stream: true
		 }));
 });
var browserSync = require('browser-sync');
gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir: ['dist']
		}
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/script/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});

