'use strict';

const lager = require('@lager/lager/src/lib/lager');
const Promise = lager.import.Promise;

const plugin = {
  name: 'plugin-inspector',

  hooks: {
    /**
     * [registerCommands description]
     * @returns {[type]}          [description]
     */
    registerCommands: function registerCommands() {
      return Promise.all([
        require('./cli/show-permissions')()
      ])
      .then(() => {
        return Promise.resolve([]);
      });
    }
  }
};

module.exports = plugin;
