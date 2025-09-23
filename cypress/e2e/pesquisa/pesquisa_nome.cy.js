describe('Pesquisa - Nome do veículo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve retornar carro pesquisado por nome', () => {
    cy.get('input[placeholder="Buscar por placa ou modelo..."]').type('Fiat Uno{enter}');
    cy.contains('Fiat Uno').should('be.visible');
  });
});