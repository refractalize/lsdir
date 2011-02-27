var fs = require('fs');
var _ = require('underscore');

var select = function (items, eachItem, finallyDo) {
    var n = 0;
    var collectedItems = [];

    var callFinallyDoIfFinished = function () {
        if (n == 0) {
            finallyDo(collectedItems);
        }
    }

    var finishedItem = function () {
        n--;
        callFinallyDoIfFinished();
    };

    _(items).each(function (item) {
        n++;
        eachItem(item, function (collected) {
            if (collected) {
                collectedItems.push(item);
            }
            finishedItem();
        });
    });

    callFinallyDoIfFinished();
};

var getDirectories = function (receiveDirectories) {
    fs.readdir('.', function (err, files) {
        select(files, function (file, selectIf) {
            fs.stat(file, function (err, fileStat) {
                selectIf(fileStat.isDirectory());
            });
        }, function (dirs) {
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
