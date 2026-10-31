# Cypress E2E Test Suite

Cypress end-to-end tests for a vehicle rental application. Coverage includes authentication, vehicle availability, vehicle search, rental creation and payment flows.

## Stack
- Cypress 15
- JavaScript / Node.js
- Network interception with `cy.intercept()`
- Fixtures and reusable custom commands

## Run locally

```bash
npm ci
npm run cy:open
npm run cy:run
```

The configured application URL is defined in `cypress.config.js`. Use only the designated test environment and test credentials.

## Scenarios
- Valid and invalid login
- Vehicle search by model
- Vehicles already rented or under maintenance cannot be rented
- Rental flow with PIX
- Rental flow with card payment
- API assertions for rental status, duration, total amount and payment method

## Structure
- `cypress/e2e/auth/`: authentication tests
- `cypress/e2e/aluguel/`: rental and payment tests
- `cypress/e2e/pesquisa/`: search tests
- `cypress/fixtures/`: test data
- `cypress/support/commands.js`: shared commands

This README documents the current test scope. No claim is made that the suite has passed in every environment; run it against the configured test application to collect current execution evidence.

## Author
João Guilherme Lima Bento
