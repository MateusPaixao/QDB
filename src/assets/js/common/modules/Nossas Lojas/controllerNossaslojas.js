(function ($, window, document, angular, savana, undefined) {
    
    "use strict";

    app.controller("nossasLojasCtrl", function ($scope, $http, storeService, $filter) {

        // -------------------------------------------------------------------------------------------------------------------------
        // # Configuração
        // -------------------------------------------------------------------------------------------------------------------------

        // Savana configuração
        // debug: false -> console.log  desligado
        savana.config({
            debug: true, // Does not show the debug
            alert: true, // Does not show the alert
        });

        // -------------------------------------------------------------------------------------------------------------------------
        // # Variaveis privadas
        // -------------------------------------------------------------------------------------------------------------------------

        // Gerar json das lojas para mostrar todas as localidades no mapa principal
        var generateJsonStores = function (stores) {
            var jsonlist = {
                "center": {
                    "lat": -14.5009009, // Brasil lat
                    "lng": -59.2662174 // Brasil lng
                },
                "markers": []
            };

            for (var i = 0, len = stores.length; i < len; i++) {
                jsonlist.markers[i] = { position: { lat: parseFloat(stores[i].lat), lng: parseFloat(stores[i].lng) }, info: { title: "<em>" + stores[i].nome + "</em>", text: "<p>" + stores[i].endereco + ", " + stores[i].numero + " - " + stores[i].cep + " - " + stores[i].cidade + " - " + stores[i].estado + "</p>", link: '' }};
            }

            return jsonlist;
        };

        var list, address, lojas_cad = 0, lojas_total = 0;

        // Looping de gravação de lat e lng no MD
        var recursiveStores = function (stores, index) {

            if (index > (stores.length - 1)) {
                console.log("Quantidade total de lojas verificadas: " + lojas_total);
                console.log("Quantidade de cadastros de lat e lng: " + lojas_cad);
                return;
            }

            list = {};
            address = stores[index].endereco + "," + stores[index].numero + " - " + stores[index].cidade + " - " + stores[index].estado;

            if (stores[index].lat === null && stores[index].lng === null) {

                storeService.getPositionAddress(address, index, function (res, index) {
                    console.log("Encontrado o endereço: " + address);
                    list.id = stores[index].id;
                    console.log(res)

                    if(res.data.results.length == 0){

                        var arrayMsg = ["============================ Endereço não encontrado na api do google ============================",
                                        "O endereço: '" + address + "' não foi reconhecido pelo google maps", 
                                        "tente acessar o endereço pelo https://www.google.com.br/maps/search/" + encodeURIComponent(address) + " para ver o que pode ser corrigido"];

                        console.error(arrayMsg[0]);
                        console.log(arrayMsg[1]);
                        console.log(arrayMsg[2]);
                        console.error(arrayMsg[0]);
                    }else{
                        list.lat = res.data.results[0].geometry.location.lat;
                        list.lng = res.data.results[0].geometry.location.lng;
                        storeService.updateStore(list, "", function (resp) {
                            console.log("Cadastrado: o endereço: " + address);
                            console.log(resp);
                            lojas_cad++;
                        });
                    }

                });

            } else {
                console.log("Já cadastrada com lat e lng: " + address);               
            }
            
            setTimeout(function(){
                lojas_total++;
                recursiveStores(stores, ++index);
            },500);    

        };

        // Pegar a latitude e longitude;
        var successFunction = function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            $scope.codeLatLng(lat, lng);
        };

        // Retorna o erro na captura da latitude e longitude;
        var errorFunction = function (error) {
            // alert("Geocoder failed");
            console.error(error);
        };

        // Pega todas as lojas cadastradas para a gravação de lat e lng
        var generatePositionStores = function () {

            storeService.getStoresAll("0-1000", function (stores) {

                if (stores.length) {
                    // console.log(stores);
                    recursiveStores(stores, 0);

                } else {
                    alert("Nenhuma loja foi encontrada!");
                    savana.hidePreloader();
                }

                $scope.$apply();

            });

        };

        // Inicia os mapas de minhas lojas
        var initMap = function (jsonStores) {

            // console.log(jsonStores);

            $('[id*="map"]').each(function () {
                var $map = $(this);
                var clusterer;
                var map;
                var iBox;
                var marker;
                var markers = [];
                var mapData = $map.data('mapdata') ? jsonStores : $map.data('center');
                var mapOptions = {
                    scrollwheel: false,
                    center: mapData.center ? mapData.center : mapData,
                    zoom: mapData.center ? 4 : 14,
                    alignBottom: true
                };
                var markersLength = mapData.markers ? mapData.markers.length : 1;

                iBox = mapData.markers ? new InfoBox(mapOptions) : null;

                map = new google.maps.Map($map[0], mapOptions);

                for (var i = 0; i < markersLength; i++) {
                    var content = mapData.markers ? mapData.markers[i].info.title + mapData.markers[i].info.text + mapData.markers[i].info.link : '';

                    // console.log(mapData.markers[i].position);
                    marker = new google.maps.Marker({
                        position: mapData.markers ? mapData.markers[i].position : mapData,
                        icon: '/arquivos/map-marker.png',
                        map: map,
                        content: content
                    });

                    if (iBox) {
                        marker.addListener('click', function () {
                            iBox.setContent(this.content);

                            iBox.open(map, this);
                        });

                        map.addListener('zoom_changed', function () {
                            iBox.close();
                        });
                    }

                    markers.push(marker);
                }

                if (mapData.markers) {
                    clusterer = new MarkerClusterer(map, markers, {
                        minimumClusterSize: 1,
                        maxZoom: 10,
                        styles: [{
                            textColor: 'white',
                            width: 50,
                            height: 50,
                            url: '/arquivos/cluster.png',
                            textSize: 14,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        }, {
                                textColor: 'white',
                                width: 81,
                                height: 81,
                                url: '/arquivos/cluster-big.png',
                                textSize: 14,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }],
                        class: 'sds'
                    });
                }
            });
        };

        // Retorna o elemento
        var element = function (el) {
            return document.querySelector(el);
        };

        // -------------------------------------------------------------------------------------------------------------------------
        // # Angular Scopes
        // -------------------------------------------------------------------------------------------------------------------------

        // Esconde o botão de paginação (Veja mais lojas) caso atinja o valor max.
        $scope.hidePagination = function (qtd) {
            var page = window.page || config.min_show_stores;
            if (page >= qtd) {
                element(".pagination").style.display = "none";
            }else{
                element(".pagination").style.display = "block";
            }
        };

        // Pegar todos os estado para inserir no select
        $scope.getStates = function (state) {
            savana.showPreloader();
            storeService.getStatesAll("0-1000", function (states) {
                if (states.length) {
                    $scope.states = states;
                    savana.hidePreloader();
                } else {
                    alert("Houve um erro na busca por estados, tente novamente mais tarde");
                    savana.hidePreloader();
                }

                $scope.$apply();

            });
        };

        $scope.name_city_current = "Selecione uma Cidade";
        $scope.name_state_current = "Selecione um Estado";
        // Pegar todas a cidade de um estado
        $scope.getCitiesByUF = function (state) {
            console.log(state)
            var UF = state.name_state;
            $scope.name_city_current = "Selecione uma Cidade";
            $scope.name_state_current = state.name_state;
            if (UF) {
                savana.showPreloader();
                storeService.getCitiesByUF(UF, function (cities) {

                    if (cities.length) {
                        $scope.cities = cities;
                        $scope.getStoresByUF(UF);
                        savana.hidePreloader();
                    } else {
                        alert("Houve um erro na busca de cidades, tente novamente mais tarde");
                        savana.hidePreloader();
                    }

                    $scope.$apply();

                });
            } else {
                alert("Estado não encotrado");
            }
        };

        // Pegar todas as lojas na tela inicial
        $scope.getStores = function (qty) {
            savana.showPreloader();
            storeService.getStoresAll(qty, function (stores) {

                if (stores.length) {

                    $scope.storeslist = stores;                  
                    $scope.getStoresCount();
                    savana.hidePreloader();
                    $scope.msgerror = "";

                } else {
                    $scope.count = 0;
                    //$scope.msgerror = "Nenhuma loja foi encontrada nesse local!";
                    savana.hidePreloader();
                }

                $scope.$apply();

            });
        };

        // Pegar a quantidade total de lojas cadastradas
        $scope.getStoresCount = function () {
            savana.showPreloader();
            storeService.getStoresCount(function (count, stores) {

                if (count) {
                    $scope.total_stores = count;
                    $scope.hidePagination(count);
                    setTimeout(function () {
                        initMap(generateJsonStores(stores));
                    });
                    savana.hidePreloader();
                } else {
                    savana.hidePreloader();
                }

                $scope.$apply();

            });
        };

        // Pegar a quantidade total de lojas cadastradas por estado
        $scope.getStoresCountUF = function (uf) {
            savana.showPreloader();
            storeService.getStoresCountUF(uf, function (count, stores) {
                if (count) {
                    $scope.msgerror = "";
                    setTimeout(function () {
                        initMap(generateJsonStores(stores));
                    });
                    $scope.count = count;
                }
                $scope.$apply();

            });
        };

        // Controle de paginação (veja mais lojas)
        $scope.getStoresByPagination = function () {

            if (!window.page) {
                window.page = config.min_show_stores * 2;
            } else {
                ++window.page;
                window.page = config.min_show_stores * window.page;
            }

            if (window.city) {
                $scope.getStoresByCity(window.city, window.page);
            } else if (window.uf) {
                $scope.getStoresByUF(window.uf, "0-" + window.page);
            } else {
                $scope.getStores("0-" + window.page);
            }

        };

        // Pegar a quantidade total de lojas cadastradas por cidade
        $scope.getStoresCountCity = function (city) {
            storeService.getStoresCountCity(city, function (stores) {
                if (stores.length) {
                    $scope.hidePagination(stores.length);
                    setTimeout(function () {
                        initMap(generateJsonStores(stores));
                    });
                    $scope.count = stores.length;
                }
                $scope.$apply();

            });
        };

        // Pegar as lojas com a busca de cidade
        $scope.getStoresByCity = function (city, pagination) {

            var pg = (pagination) ? pagination : config.min_show_stores;
            pagination = "0-" + pg;

            if (city) {
                window.city = city;
                savana.showPreloader();
                city = (city);
                storeService.getStoresByCity(city, pagination, function (stores) {

                    if (stores.length) {
                        $scope.storeslist = stores;
                        //$scope.total_stores = stores.length;
                        console.log('<-- LOJAS POR CIDADE -->');
                        console.log(stores);
                        $scope.getStoresCountCity(city);
                        $scope.msgerror = "";
                        setTimeout(function () {
                            initMap(generateJsonStores(stores));
                        });
                        savana.hidePreloader();
                    } else {
                        $scope.count = 0;
                        $scope.storeslist = stores;
                        console.log(stores.length);
                        $scope.msgerror = "Nenhuma loja foi encontrada nesse local!";
                        savana.hidePreloader();
                    }

                    $scope.$apply();

                });
            }

        };

        // Pegar as lojas com a busca de estado
        $scope.getStoresByUF = function (uf, pagination) {

            window.uf = uf;
            pagination = "0-" + (pagination) ? pagination : config.min_show_stores;

            if (window.uf) {
                savana.showPreloader();
                storeService.getStoresByUF(window.uf, pagination, function (stores) {

                    if (stores.length) {
                        $scope.storeslist = stores;
                        //$scope.total_stores = stores.length;
                        $scope.getStoresCountUF(uf);
                        $scope.hidePagination(stores.length);
                        savana.hidePreloader();
                        $scope.msgerror = "";
                    } else {
                        $scope.count = 0;
                        //$scope.msgerror = "Nenhuma loja foi encontrada nesse local!";
                        $scope.getStoresCountUF(uf);
                        savana.hidePreloader();
                    }

                    $scope.$apply();

                });
            }

        };

        // Trgigger para pegar as lojas com a busca de cidade
        $scope.triggerGetStoresByCity = function (city) {

            var $target = $(".section-map");
            $scope.name_city_current = city.name_city;

			$('html, body').animate({
				scrollTop: $target.offset().top - 100
			}, 1000, 'linear');

            $scope.getStoresByCity(city.name_city);
        };

        // Pegar a localização do usuario (API BROWSER)
        $scope.getGEO = function ($event) {

            $event.stopPropagation();
            $event.preventDefault();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
            }

        };

        $scope.codeLatLng = function (lat, lng) {

            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat, lng);
            var city;

            geocoder.geocode({
                'latLng': latlng
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    console.log("Lojas Geocode" + results);

                    if (results[0]) {
                        //formatted address
                        //alert(results[0].formatted_address)
                        //find country name
                        for (var i = 0; i < results[0].address_components.length; i++) {
                            for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                if (results[0].address_components[i].types[b] == "locality") {
                                    //this is the object you are looking for
                                    city = results[0].address_components[i].short_name;
                                    $scope.getStoresByCity(city);
                                    console.warn("Cidade escolhida: " + city);
                                    break;
                                }
                            }
                        }

                    } 
                } 
            });
        };

        $scope.init = function () {
            savana.loadPreloader();
            $scope.getStores("0-" + config.min_show_stores);
            $scope.getStates();

            if (savana.getParams("generate") == "true")
                generatePositionStores();
        };

        // Start
        $scope.init();

    });

    // -------------------------------------------------------------------------------------------------------------------------
    // # Filtros
    // -------------------------------------------------------------------------------------------------------------------------

    app.filter("rewrite", function () {
        return function (input) {
            return input.toLowerCase().trim()
                .replace(/[áàãâä]/g, "a")
                .replace(/[éèẽêë]/g, "e")
                .replace(/[íìĩîï]/g, "i")
                .replace(/[óòõôö]/g, "o")
                .replace(/[úùũûü]/g, "u")
                .replace(/ç/g, "c")
                .replace(/(\ |_)+/, " ")
                .replace(/(^-+|-+$)/, "")
                .replace(/[^a-z0-9]+/g, '-');
        };
    });

    app.filter("tiraAcento", function () {
        return function (input) {
            return input.toLowerCase().trim()
                .replace(/[áàãâä]/g, "a")
                .replace(/[éèẽêë]/g, "e")
                .replace(/[íìĩîï]/g, "i")
                .replace(/[óòõôö]/g, "o")
                .replace(/[úùũûü]/g, "u")
                .replace(/ç/g, "c")
                .replace(/(\ |_)+/, " ")
                .replace(/(^-+|-+$)/, "")
                .replace(/[^a-z0-9]+/g, ' ');
        };
    });

})(jQuery, window, document, angular, savana);
