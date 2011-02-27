var fs = require('fs');
var _ = require('underscore');

var callbacker = function () {
    var _this = _(arguments).head();
    var func_args = _(arguments).tail();
    var func = _(func_args).head();
    var args = _(func_args).tail();

    var result, error;

    args.push(function (err, res) {
        if (result) result(res);
        if (error) error(err);
    });

    func.apply(_this, args);

    return {
        result: function (f) {
            result = f;
        },
        error: function (f) {
            error = f;
        }
    };
}

var getDirectories = function (receiveDirectories) {
    var dirs = [];
    var n = 0;

    callbacker(fs, fs.readdir, '.').result(function (files) {
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

        if (n==0) {
            receiveDirectories(dirs);
        }
    });
}

getDirectories(function (dirs) {
    console.log('dirs:')
    _(dirs).each(function (dir) {
        console.log('    ' + dir);
    });
    console.log('count: ' + dirs.length);
});
