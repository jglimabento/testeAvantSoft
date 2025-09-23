describe('Aluguel de carro - PIX', () => {
  beforeEach(() => {
    cy.login();

    cy.intercept('GET', '/api/vehicles').as('getVehicles');
    cy.visit('/dashboard');
    cy.wait('@getVehicles').its('response.statusCode').should('eq', 200);
    cy.get('.vehicle-card', { timeout: 10000 }).should('have.length.gt', 0);
  });

  it('Deve alugar carro com sucesso usando PIX', () => {
    const diasDeAluguel = 2;
    const precoDaDiaria = 300;
    const valorTotalEsperado = diasDeAluguel * precoDaDiaria;

  
    cy.get('.vehicle-card').should('have.length.gt', 0);
    cy.get('.vehicle-card').first().should('contain', 'Disponível');

   
    cy.intercept('POST', '/api/rentals').as('criarAluguel');

   
    cy.alugarCarro(diasDeAluguel, 'pix');

  
    cy.wait('@criarAluguel').then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.success).to.be.true;
      expect(response.body.vehicle.status).to.eq('Alugado');
      expect(response.body.rental.days).to.eq(diasDeAluguel);
      expect(response.body.rental.totalValue).to.eq(valorTotalEsperado);
      expect(response.body.rental.paymentMethod).to.eq('pix');
    });

    cy.contains('h2', 'Aluguel confirmado', { timeout: 10000 })
      .should('be.visible');
    cy.contains('PIX').should('be.visible');
  });
});
