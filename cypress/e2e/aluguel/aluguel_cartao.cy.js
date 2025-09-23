describe('Aluguel - Cartão', () => {
  beforeEach(() => {
    cy.login(); 
    cy.intercept('GET', '/api/vehicles').as('getVehicles');
    cy.visit('/dashboard');
    cy.wait('@getVehicles').its('response.statusCode').should('eq', 200);
    cy.get('.vehicle-card', { timeout: 10000 }).should('exist');
  });

  it('Deve alugar o veículo com sucesso e validar a criação do aluguel na API', () => {

    const diasDeAluguel = 1;
    const precoDaDiaria = 300;
    const valorTotalEsperado = diasDeAluguel * precoDaDiaria;


    cy.intercept('POST', '/api/rentals').as('criarAluguel');


    cy.get('.vehicle-card')
      .should('exist') 
      .each(($card) => {
        if ($card.find('button:not([disabled])').length > 0) {
          cy.wrap($card).within(() => {
            cy.get('button')
              .should('be.visible')
              .and('not.be.disabled')
              .click();
          });
          return false;
        }
      });

    cy.get('input[type="number"]')
      .should('be.visible')
      .clear()
      .type(diasDeAluguel);
    
    cy.get('input[value="cartao"]')
      .should('be.visible')
      .click();
    
    cy.contains('button', 'Confirmar')
      .should('be.visible')
      .click();

    cy.wait('@criarAluguel').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.vehicle.status).to.eq('Alugado');
      expect(response.body.rental.days).to.eq(diasDeAluguel);
      expect(response.body.rental.totalValue).to.eq(valorTotalEsperado);
    });

    cy.contains('Aluguel realizado com sucesso')
      .should('be.visible');
  });
});
