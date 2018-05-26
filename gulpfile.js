var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var mock = require('./src/json/mock.js');
var sequence = require('gulp-sequence');
var less = require('gulp-less');
var minjs = require('gulp-uglify');
var mincss = require('gulp-clean-css');
var babel = require('gulp-babel');
var minhtml = require('gulp-htmlmin');
var obj = {
    name: "zs",
    pwd: 1111
}
gulp.task('server', function() {
    gulp.src('dist')
        .pipe(server({
            host: "localhost",
            port: 8888,
            middleware: function(req, res, next) {
                var uobj = url.parse(req.url, true);
                var check = true;
                var pathname = uobj.pathname;
                if (pathname === '/favicon.ico') { return; };
                if (/\/book/g.test(pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                }
                if (pathname === '/login') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = require('querystring').parse(Buffer.concat(arr).toString());
                        if (check) {
                            if (data.user == obj.name && data.pwd == obj.pwd) {
                                check = false;
                                res.end('{"code":1}');
                            } else {
                                res.end('{"code":2,"msg":"用户名或密码错误"}');
                            }
                        }
                        next();
                    });
                    return false;
                }
                next();
            }
        }))
});
gulp.task('zlibcss', function() {
    gulp.src('./src/css/*.css')
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest('./dist/css'))
});
gulp.task('zlibjs', function() {
    gulp.src(['./src/js/{common/,lib/,page/}*.js', './src/js/main.js'])
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(minjs())
        .pipe(gulp.dest('./dist/js'))
});
gulp.task('zlibhtml', function() {
    gulp.src(['./src/{page/,views/}*.html', './src/index.html'])
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(minhtml({
            collapseWhitespace: true, //压缩HTML
            minifyJS: true, //压缩页面JS
            minifyCSS: true //压缩页面CSS
        }))
        .pipe(gulp.dest('./dist'))
});
// gulp.task('change', function() {
//     // gulp.watch('./src/css/*.js', ['zlibjs']);
//     gulp.watch('./src/css/*.{less,scss}', ['zlibcss']);
// });
gulp.task('default', function(cb) {
    sequence('zlibcss', 'zlibjs', 'zlibhtml', 'server', cb);
});