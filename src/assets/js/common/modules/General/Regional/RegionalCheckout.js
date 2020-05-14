(function($, window, document) {
  // var $win = $(window);
  var $doc = $(document);

  $doc.ready(function() {
    $(window).on('hashchange', () => {
      if (location.hash == '#/shipping') {
        regionalization.init();
      }

      if (location.hash == '#/payment') {
        regionalization.init();
      }
    });

    $(window).on('checkoutReady.vtex', () => {
      if (location.hash == '#/shipping') {
        regionalization.init();
      }

      if (location.hash == '#/payment') {
        regionalization.init();
      }
    });

    if (location.hash == '#/shipping') {
      regionalization.init();
    }

    if (location.hash == '#/payment') {
      regionalization.init();
    }
  });
})($, window, document);

var regionalization = {
  regions: {
    AM: {
      state: 'Amazonas',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    RR: {
      state: 'Roraima',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    AP: {
      state: 'Amapá',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    PA: {
      state: 'Pará',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    RO: {
      state: 'Rondônia',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    AC: {
      state: 'Acre',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    TO: {
      state: 'Tocantins',
      region: 'Região Norte',
      utm: 'REGIAO_NORTE'
    },
    MA: {
      state: 'Maranhão',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    PI: {
      state: 'Piauí',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    CE: {
      state: 'Ceará',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    RN: {
      state: 'Rio Grande do Norte',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    PE: {
      state: 'Pernambuco',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    PB: {
      state: 'Paraíba',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    SE: {
      state: 'Sergipe',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    AL: {
      state: 'Alagoas',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    BA: {
      state: 'Bahia',
      region: 'Região Nordeste',
      utm: 'REGIAO_NORDESTE'
    },
    MT: {
      state: 'Mato Grosso',
      region: 'Região Centro-Oeste',
      utm: 'REGIAO_CENTROESTE'
    },
    MS: {
      state: 'Mato Grosso do Sul',
      region: 'Região Centro-Oeste',
      utm: 'REGIAO_CENTROESTE'
    },
    GO: {
      state: 'Goiás',
      region: 'Região Centro-Oeste',
      utm: 'REGIAO_CENTROESTE'
    },
    DF: {
      state: 'Ditrito Federal',
      region: 'Região Centro-Oeste',
      utm: 'REGIAO_CENTROESTE'
    },
    SP: {
      state: 'São Paulo',
      region: 'Região Sudeste',
      utm: 'REGIAO_SUDESTE'
    },
    RJ: {
      state: 'Rio de Janeiro',
      region: 'Região Sudeste',
      utm: 'REGIAO_SUDESTE'
    },
    ES: {
      state: 'Espírito Santo',
      region: 'Região Sudeste',
      utm: 'REGIAO_SUDESTE'
    },
    MG: {
      state: 'Minas Gerais',
      region: 'Região Sudeste',
      utm: 'REGIAO_SUDESTE'
    },
    PR: {
      state: 'Paraná',
      region: 'Região Sul',
      utm: 'REGIAO_SUL'
    },
    RS: {
      state: 'Rio Grande do Sul',
      region: 'Região Sul',
      utm: 'REGIAO_SUL'
    },
    SC: {
      state: 'Santa Catarina',
      region: 'Região Sul',
      utm: 'REGIAO_SUL'
    }
  },
  init: function() {
    var _self = this;

    this.getOrderForm(function(orderForm) {
      if (orderForm.shippingData && localStorage.getItem('pricetablestate') != null) {
        if (orderForm.shippingData.address) {
          if (
            _self.regions[orderForm.shippingData.address.state].utm !=
            localStorage.getItem('pricetablestate')
          ) {
            _self.appendHtmlModal();
            _self.controllerModal();
            _self.removeUtmMarketingData();
          }
        }
      }
    });
  },
  modalHtml: function() {
    return (
      '<div class="modal-overlay" id="modal-region">' +
      '<div class="modal-wrapper">' +
      '<div class="modal-container">' +
      '<button class="btn-modal-close"><i class="ico-close">+</i></button>' +
      '<div class="form-inner-secondary">' +
      '<div class="form-group">' +
      '<header class="header-title">' +
      '<h3> Opa! </h3>' +
      '</header>' +
      '<div class="form-row">' +
      '<p> A região atual não é a mesma que escolheu anteriormente. Coloque seu CEP abaixo para identificarmos sua localização correta.</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );
  },
  controllerModal: function() {
    $('#modal-region').on('click', '.btn-modal-close', function() {
      $('#modal-region').hide();
    });
  },
  appendHtmlModal: function() {
    if (!$('#modal-region').length) {
      $('body').append(this.modalHtml());
    }
  },
  isEmpty: function(value) {
    return value == null || value == '' || value == undefined || value == 'undefined'
      ? true
      : false;
  },
  getOrderForm: function(callback) {
    if (!callback) return;

    vtexjs.checkout.getOrderForm().done(function(orderForm) {
      callback(orderForm);
    });
  },
  removeUtmMarketingData() {
    vtexjs.checkout
      .getOrderForm()
      .then(function(orderForm) {
        $.ajax({
          url: '/api/sessions/',
          type: 'POST',
          dataType: 'json',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          data: JSON.stringify({
            public: {
              postalCode: {
                value: orderForm.shippingData.address.postalCode.replace('-', '')
              },
              country: {
                value: 'BRA'
              }
            }
          }),
          success: response => {
            console.log('>>> response <<<<', response);
          },
          error: () => {
            // callback(error)
          }
        });

        vtexjs.checkout.sendAttachment('shippingData', orderForm.shippingData);
      })
      .done(function(orderForm) {
        console.log(orderForm);
      });
  }
};
