(function ($, window, document, angular, undefined) {

    app.factory('masterdataAPI', function ($http) {

        var _ajax = function (url, data, method, fn) {

            var _callback = fn || false;

            $http({
                url: url,
                data: (data) ? data : "",
                type: method,
                success: function (res) {

                    if (typeof _callback == "function")
                        fn(res);

                    console.info("OK " + method + " -- " + url);
                    console.info(res);

                },
                error: function (e) {

                    if (typeof _callback == "function")
                        fn(false);

                    console.error("Error: " + method + " -- " + url);
                    console.error(e);

                }
            });

        };

        var _request = function (data, params, method, qty, fn) {

            var _callback = fn || false;
            var url = config.baseUrl + params;
            qty = qty || "0-" + config.min_show_stores;

            config.headers['REST-range'] = "resources=" + qty;

            $.ajax({
                url: url,
                data: (Object.keys(data).length) ? JSON.stringify(data) : "",
                type: method,
                headers: config.headers,
            }).then(function (response) {
                if (response) {
                    // success
                    if (typeof _callback == "function")
                        fn(response);
                    console.info("OK " + method + " -- " + url);
                } else {
                    // failed
                    if (typeof _callback == "function")
                        fn(false);
                    console.error("OK " + method + " -- " + url);
                }
            });

        };

        var _insert = function (data, params, fn) {
            if (!data || !Object.keys(data).length) {
                console.info("O objeto de dados esta vazio");
                return;
            }
            var _callback = fn || false;
            _request(data, params, "POST", "0-1", function (resp) {
                if (typeof _callback == "function")
                    fn(resp || true);
            });
            return null;
        };

        var _select = function (params, qty, fn) {
            var _callback = fn || false;
            _request({}, params, "GET", qty, function (resp) {
                if (typeof _callback == "function")
                    fn(resp);
            });
            return null;
        };

        var _update = function (data, params, fn) {
            if (!data || !Object.keys(data).length) {
                console.info("O objeto de dados esta vazio");
                return;
            }
            var _callback = fn || false;
            _request(data, params, "PATCH", "0-1", function (resp) {
                if (typeof _callback == "function")
                    fn(resp || true);
            });
            return null;
        };

        var _delete = function (params, fn) {
            var _callback = fn || false;
            _request({}, params, "DELETE", "0-1", function (resp) {
                if (typeof _callback == "function")
                    fn(resp);
            });
            return null;
        };

        return {
            insert: _insert,
            select: _select,
            update: _update,
            delete: _delete,
            ajax: _ajax
        };
    });

})(jQuery, window, document, angular);
