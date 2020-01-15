import Checkout from './modules/Checkout/checkout-index'

/**UTLS*/
var Utls = function(e, h, k, l) {
    return function() {
        var c = this;
        c.getSkus = function(a) {
            var b = e.Deferred();
            if ("undefined" === a)
                return b.reject("Missing product id."),
                b.promise();
            if (c.getSkus.data[a])
                return b.resolve(c.getSkus.data[a]),
                b.promise();
            vtexjs.catalog.getProductWithVariations(a).fail(function(d) {
                c.getSkus.data[a] = [];
                b.reject("Product id not found.")
            }).done(function(d) {
                c.getSkus.data[a] = {
                    id: d.productId,
                    name: d.name,
                    skus: d.skus.slice(),
                    salesChannel: d.salesChannel,
                    available: d.available
                };
                b.resolve(c.getSkus.data[a])
            });
            return b.promise()
        }
        ;
        c.getSkus.data = {};
        c.getSkuList = function(a) {
            if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                return a = new Promise(function(a, c) {
                    c("Missing list of product id. eg. [1, 45, 83].")
                }
                ),
                Promise.all([a]);
            var b = []
              , d = {};
            e.each(a, function(a, f) {
                var g = new Promise(function(a, b) {
                    c.getSkuList.data[f] ? a(c.getSkuList.data) : c.getSkus(f).then(function(b) {
                        d[f] = e.extend({}, b);
                        c.getSkuList.data = e.extend({}, d, c.getSkuList.data);
                        a(c.getSkuList.data)
                    }, function(a) {
                        b("Product id not found.")
                    })
                }
                );
                b.push(g)
            });
            return Promise.all(b)
        }
        ;
        c.getSkuList.data = {};
        c.getInfo = function(a) {
            var b = e.Deferred();
            if ("undefined" === a)
                return b.reject("Missing product id."),
                b.promise();
            var d = "/api/catalog_system/pub/products/search/?fq=productId:" + a;
            if (c.getInfo.data[a])
                return b.resolve(c.getInfo.data[a]),
                b.promise();
            e.ajax({
                url: d, 
                success: function(d) {
                    c.getInfo.data[a] = d;
                    b.resolve(c.getInfo.data[a])
                },
                error: function(d) {
                    c.getInfo.data[a] = [];
                    b.reject("Product id not found.")
                }
            });
            return b.promise()
        }
        ;
        c.getInfo.data = {};
        c.addProducts = function(a) {
            var b = e.Deferred();
            if ("undefined" === a || "undefined" !== a && !(a instanceof Array))
                return b.reject("Missing array of objects. eg. [{ id: 1 }, { id: 2, quantity: 2 }]"),
                b.promise();
            var c = [];
            e.each(a, function(a, b) {
                var d = Object.assign({
                    id: 0,
                    quantity: 1,
                    seller: 1
                }, b);
                c.push(d)
            });
            vtexjs.checkout.addToCart(c).fail(function(a) {
                b.reject(a)
            }).done(function(a) {
                b.resolve(a)
            });
            return b.promise()
        }
        ;
        "undefined" !== typeof console && "undefined" !== typeof console.log && (c.__log = console.log);
        return !0
    }
} 


// Methods.init(); 