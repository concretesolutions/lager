'use strict';

// Nice ES6 syntax
// const { Promise, _, icli } = require('@lager/lager/src/lib/lager').import;
const lager = require('@lager/lager/src/lib/lager');
const icli = lager.import.icli;

/**
 * This module exports a function that enrich the interactive command line and return a promise
 * @returns {Promise} - a promise that resolve when the operation is done
 */
module.exports = () => {
  const config = {
    section: 'Plugin inspector',
    cmd: 'show-permissions',
    description: 'show required AWS permissions to use a plugin',
    parameters: [{
      cmdSpec: '[plugin-identifier]',
      type: 'list',
      choices: lager.getRegisteredPluginNames(),
      question: {
        message: 'For which plugin do you want to see the required AWS permissions?'
      }
    }]
  };

  /**
   * Create the command and the prompt
   */
  return icli.createSubCommand(config, executeCommand);
};

/**
 * Show the policy required by the plugin
 * @param {Object} parameters - the parameters provided in the command and in the prompt
 * @returns {Promise<null>} - The execution stops here
 */
function executeCommand(parameters) {
  const plugin = lager.getPlugin(parameters.pluginIdentifier);
  if (plugin.getAwsPermissions) {
    console.log('\n  To fully use the plugin ' + icli.format.info(parameters.pluginIdentifier) + ', you should use this policy:\n');
    console.log(icli.highlight(JSON.stringify(plugin.getAwsPermissions(), null, 2), { json: true }));
    console.log();
  } else {
    console.log('\n  Unfortunately, the plugin ' + icli.format.info(parameters.pluginIdentifier) + ' does not document the AWS permissions it needs\n');
  }
}
