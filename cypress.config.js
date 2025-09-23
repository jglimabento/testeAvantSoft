const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qe-test.recrutamento.avantsoft.com.br",
    viewportWidth: 1366,
    viewportHeight: 768,
    setupNodeEvents(on, config) {
    },
  },
});
