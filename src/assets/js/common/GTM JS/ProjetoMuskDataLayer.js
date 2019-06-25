
var pdpMetrics = function () {
    var _result = {};
    $('div#caracteristicas table tr').each(function (ndx, tr) {
        var _obj = {};
        _obj._field = $(tr).find('th')[0].className.replace(/name-field*/, '').replace(/-/g, '_');
        _obj._value = $(tr).find('td').text();
        _result[_obj._field] = _obj._value
    });
    dataLayer.push(_result);
  
    return true;
};
var buyButton = $('.product-buy-button .buy-button.buy-button-ref');
buyButton.on('click',function(){
	pdpMetrics();
});

