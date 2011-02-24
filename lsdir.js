var fs = require('fs');
var _ = require('underscore');

var getDirectories = function (receiveDirectories) {
    var dirs = [];
    var n = 0;

    fs.readdir('.', function (err, files) {
        _(files).each(function (file) {
            n++;
            fs.stat(file, function (err, fileStat) {
                if (fileStat.isDirectory()) {
                    dirs.push(file);
                }
                n--;
                if (n==0) {
                    receiveDirectories(dirs);
                }
            });
        });
    });

    receiveDirectories(dirs);
}

getDirectories(function (dirs) {
    _(dirs).each(function (dir) {
        console.log(dir);
    });
});