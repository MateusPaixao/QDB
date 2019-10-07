(function ($, window, document, angular, undefined) {

    "use strict";

    app.service('storeService', function($http, masterdataAPI, $sce) {

        var _getStatesAll = function(qtd, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStates + "/search?_fields=uf,estado", qtd, function(states) {
                if (states.length) {
                    fn(states);
                } else {
                    fn(false);
                }
            });
        };

        var _getCitiesByUF = function(uf, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableCities + "/search?uf=" + uf + "&_fields=uf,cidade", "0-"+config.max_show_stores, function(cities) {
                if (cities.length) {
                    fn(cities);
                } else {
                    fn(false);
                }
            });
        };

        var _getStoresByUF = function(uf, qty, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search?uf=" + uf + "&_fields=lat,lng,cep,cidade,destaque,email,endereco,estado,foto,marcas,nome,numero,observacao,telefone,uf,atendimento&_sort=nome", qty, function(cities) {
                if (cities.length) {
                    fn(cities);
                } else {
                    fn(false);
                }
            });
        };

        var _insertArrayAtendimento = function(stores) {
            // Seperação dos atendimentos
            var list, listHorarios;

            // Lista de lojas
            for (var i = 0, len = stores.length; i < len; i++) {
                listHorarios = [];

                // Caso acha ";" de separação
                if (stores[i].atendimento) {

                    if (stores[i].atendimento.toString().indexOf(";") != -1) {
                        list = stores[i].atendimento.split(";");

                        // Lista de atendimento
                        for (var c = 0, len2 = list.length; c < len2; c++) {
                            listHorarios[c] = { horario: _insertBR("das", "<br /> das", list[c]) };
                        }

                        stores[i].atendimento = listHorarios;

                    } else {
                        stores[i].atendimento = [{ horario: _insertBR(stores[i].atendimento) }];
                    }

                } else {
                    stores[i].atendimento = "";
                }

            }

            return stores;

        };

        var _getStoresByCity = function(city, qty, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search?cidade=" + city + "&_fields=cep,lat,lng,cidade,destaque,email,endereco,estado,foto,marcas,nome,numero,observacao,telefone,uf,atendimento&_sort=nome", qty, function(stores) {
                if (stores.length) {
                    stores = _insertArrayAtendimento(stores);
                    fn(stores);
                } else {
                    fn(false);
                }
            });
        };

        var _insertBR = function(replace, value, str) {
            return $sce.trustAsHtml(str.replace(replace, value));
        };

        var _getStoresAll = function(qtd, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search" + "?_fields=id,lat,lng,cep,cidade,destaque,email,endereco,estado,foto,marcas,nome,numero,observacao,telefone,uf,atendimento&_sort=nome", qtd, function(stores) {
                if (stores.length) {
                    stores = _insertArrayAtendimento(stores);
                    fn(stores);
                } else {
                    fn(false);
                }
            });
        };

        var _getStoresCount = function(fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search?_fields=id,lat,lng,cep,cidade,destaque,email,endereco,estado,foto,marcas,nome,numero,observacao,telefone,uf,atendimento&_sort=nome", "0-"+config.max_show_stores, function(store) {
                if (store.length) {
                    fn(store.length, store);
                } else {
                    fn(false);
                }
            });
        };

        var _getStoresCountByUF = function(uf, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search?uf=" + uf + "&_fields=id,lat,lng,cep,cidade,destaque,email,endereco,estado,foto,marcas,nome,numero,observacao,telefone,uf,atendimento&_sort=nome", "0-"+config.max_show_stores, function(store) {
                if (store.length) {
                    fn(store.length, store);
                } else {
                    fn(false);
                }
            });
        };

        var _getStoresCountCity = function(city, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search?cidade=" + city + "&_fields=id,lat,lng,cep,cidade,destaque,email,endereco,estado,foto,marcas,nome,numero,observacao,telefone,uf,atendimento&_sort=nome", "0-"+config.max_show_stores, function(store) {
                if (store.length) {
                    fn(store);
                } else {
                    fn(false);
                }
            });
        };   

        var _getStore = function(id, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/document/" + id, "0-1", function(store) {
                if (store.length) {
                    fn(store);
                } else {
                    fn(false);
                }
            });
        };

        var _getStoreByParams = function(params, qtd, fn) {

            var _callback = fn || false;
            if (!_callback) return;

            masterdataAPI.select(config.tableStores + "/search?" + params, qtd, function(stores) {
                if (user.length) {
                    fn(stores);
                } else {
                    fn(false);
                }
            });
        };

        var _updateStore = function(data, params, fn) {
            masterdataAPI.update(data, config.tableStores + "/documents/" + params, function(store) {
                fn(store);
            });
        };

        var _getPositionAddress = function(address, index, fn) {
            $http({
                method: 'GET',
                url: 'http://maps.google.com/maps/api/geocode/json?address=' + address + '&sensor=false'
            }).then(function(res) {
                fn(res, index);
                // res.data.results[0].geometry.location
            });
        };

        return {
            getStoresAll: _getStoresAll,
            getCitiesByUF: _getCitiesByUF,
            getStore: _getStore,
            getStoresByUF: _getStoresByUF,
            getStoreByParams: _getStoreByParams,
            getStatesAll: _getStatesAll,
            getStoresCount: _getStoresCount,
            getStoresCountUF: _getStoresCountByUF,
            getStoresByCity: _getStoresByCity,
            updateStore: _updateStore,
            getPositionAddress: _getPositionAddress,
            getStoresCountCity: _getStoresCountCity,
            api: masterdataAPI
        };

    });

})(jQuery, window, document, angular);
