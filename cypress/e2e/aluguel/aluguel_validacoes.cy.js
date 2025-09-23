describe('Validações de Aluguel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Não deve permitir alugar um carro já alugado', () => {
    cy.fixture('veiculos').then(v => {
     
      cy.contains('h3', v.carroAlugado)
        .parents('.vehicle-card')
        .find('button:contains("Alugar")')
        .should('be.disabled');
    });
  });

  it('Não deve permitir alugar um carro em manutenção', () => {
    cy.fixture('veiculos').then(v => {
      cy.contains('h3', v.carroManutencao)
        .parents('.vehicle-card')
        .find('button:contains("Alugar")')
        .should('be.disabled');
    });
  });

});