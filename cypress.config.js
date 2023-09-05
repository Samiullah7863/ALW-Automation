const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://juniper-stage-learn.alw.sa',
    // experimentalSourceRewriting: true
  },
  env: {
    server: 'juniper-stage-learn.alw.sa'
  },
});
