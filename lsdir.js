var fs = require('fs');
var _ = require('underscore');
var zo = require('./zo').zo;

var getDirectories = function (receiveDirectories) {
    fs.readdir('.', function (err, files) {
        zo(files).select(function (file, selectIf) {
            fs.stat(file, function (err, fileStat) {
                selectIf(fileStat.isDirectory());
            });
        }).results(function (dirs) {
            receiveDirectories(dirs);
        });
    });
}

getDirectories(function (dirs) {
    console.log('dirs:')
    _(dirs).each(function (dir) {
        console.log('    ' + dir);
    });
    console.log('count: ' + dirs.length);
});
