const { defineConfig } = require("cypress");
const { seedDatabase } = require("./seedDatabase.js");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {
        seedDatabase,

        log(message) {
          console.log(message);
          return null;
        }
      });

      const version = config.env.version || 'local'
        
      config.env = require(`./cypress/config/${version}.json`);

      config.baseUrl = config.env.baseUrl

      return config
    },
    baseUrl:'http://localhost:3000',
    viewportHeight: 550,
    viewportWidth: 660,
    experimentalStudio: true,
    // defaultCommandTimeout: 6000,
  },
});


require('@applitools/eyes-cypress')(module);
