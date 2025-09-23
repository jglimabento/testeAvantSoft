describe('Pesquisa - Placa do veículo', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Deve retornar carro pesquisado por placa', () => {
    cy.fixture('veiculos').then(v => {
      cy.get('input[placeholder="Buscar por placa ou modelo..."]').type(v.placa + '{enter}');
      cy.contains(v.placa).should('be.visible');
    });
  });
});