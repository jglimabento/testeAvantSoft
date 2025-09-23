describe('Logout', () => {
  it('Deve deslogar e voltar para tela de login', () => {
    cy.login();
    cy.contains('button', 'Sair').click();
  });
});