Cypress.Commands.add('login', (usuario = 'admin') => {
  cy.fixture('usuarios').then(users => {
    cy.intercept('POST', '/api/login').as('postLogin');
    cy.visit('/login');
    cy.get('input[type="email"]').type(users[usuario].email);
    cy.get('input[type="password"]').type(users[usuario].senha);
    cy.get('button[type="submit"]').click();
    cy.wait('@postLogin').its('response.statusCode').should('eq', 200);
  });
});



Cypress.Commands.add('alugarCarro', (dias, metodoPagamento) => {

  cy.get('.vehicle-card').first().within(() => {
    cy.get('button').first().click();
  });

 
  cy.get('input[type="number"]').clear().type(dias);
  
  
  cy.contains('button', 'Confirmar Aluguel')
    .should('be.visible')
    .and('not.be.disabled', { timeout: 10000 }) 
    .click();

  
  cy.contains('h2', 'Pagamento', { timeout: 10000 }).should('be.visible');
  
  
  cy.contains('button', 'PIX', { timeout: 5000 })
    .should('be.visible')
    .click();
  
 
  cy.contains('button', 'Confirmar Pagamento')
    .should('be.visible')
    .click();
});







