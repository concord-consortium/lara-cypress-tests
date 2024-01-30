const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'qxgek3',
  chromeWebSecurity: false,
  video: true,
  screenshotOnRunFailure: true,
  requestTimeout: 60000,
  defaultCommandTimeout: 30000,
  responseTimeout: 60000,
  retries: 0,
  e2e: {
    testIsolation: false,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
