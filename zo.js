var _ = require('underscore');

(function () {
    var zo = function (items, pipeline) {
        pipeline = (pipeline || []);

        var runPipeline = function (items, funcs) {
            first = _(funcs).head();
            if (first) {
                first(items, function (it) { runPipeline(it, _(funcs).tail()); });
            }
        }

        return {
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

    exports.zo = zo;
}());
