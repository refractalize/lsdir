var fs = require('fs');
var _ = require('underscore');

var zo = function (items, pipeline) {
    pipeline = (pipeline || []);

    var runPipeline = function (items, funcs) {
        first = _(funcs).head();
        if (first) {
            first(items, function (it) { runPipeline(it, _(funcs).tail()); });
        }
    }

    return {
        tail: function () {
            pipeline.push(function (items, next) {
                console.log('tail');
                console.log(items);
                next(_(items).tail());
            });
            return zo(items, pipeline);
        },
        results: function (f) {
            pipeline.push(function (items, next) {
                f(items);
            });
            runPipeline(items, pipeline);
        },
        select: function (selector) {
            pipeline.push(function (items, next) {
                var n = items.length;
                var selectedItems = [];

                if (n > 0) {
                    _(items).each(function (item) {
                        selector(item, function (selected) {
                            if (selected) selectedItems.push(item);
                            n--;
                            if (n == 0) {
                                next(selectedItems);
                            }
                        });
                    });
                } else {
                    next(selectedItems);
                }
            });

            return zo(items, pipeline);
        }
    };
};

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
