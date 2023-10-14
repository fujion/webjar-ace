const {src, dest, series} = require('gulp');
const rename = require("gulp-rename");

const srcDir = './node_modules/ace-builds/';
const destDir = '${webjar.target}/';

function task1() {
    return _copy(['*.md', 'LICENSE'])
}

function task2() {
    return _copy('src-noconflict/*.js', 'dist');
}

function task3() {
    return _copy('src-noconflict/snippets/*.js', 'dist/snippets');
}

function task4() {
    return _copy('src-min-noconflict/*.js', 'dist', path => path.extname = '.min.js');
}

function task5() {
    return _copy('src-min-noconflict/snippets/*.js', 'dist/snippets', path => path.extname = '.min.js');
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _copy(_src, _dest, _rename) {
    console.log('  Copying ' + _src);

    if (_rename) {
        return _toSrc(_src).pipe(rename(_rename)).pipe(_toDest(_dest))
    } else {
        return _toSrc(_src).pipe(_toDest(_dest))
    }
}

exports.default = series(task1, task2, task3, task4, task5);
