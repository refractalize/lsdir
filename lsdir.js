var fs = require('fs');
var _ = require('underscore');

var createSequence = function () {
    var n = 0;
    var thenDoThis;

    return {
        waitForThis: function (f) {
            n++;
            return function () {
                n--;

                var res = f.apply(null, arguments);

                if (n == 0) {
                    thenDoThis();
                }

                return res;
            };
        },
        thenDoThis: function (f) {
            if (n == 0) {
                f();
            } else {
                thenDoThis = f;
            }
        }
    };
};

var getDirectories = function (receiveDirectories) {
    var dirs = [];

    fs.readdir('.', function (err, files) {
        var sequence = createSequence();

        _(files).each(function (file) {
            fs.stat(file, sequence.waitForThis(function (err, fileStat) {
                if (fileStat.isDirectory()) {
                    dirs.push(file);
                }
            }));
        });

        sequence.thenDoThis(function () {
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
