var config = require('../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Home - Quem Disse Berenice': function(browser) {
    browser
      .url('https://www.quemdisseberenice.com.br/')
      .waitForElementVisible('body')
      .saveScreenshot('home-qdb.png')
      .end();
  }
};