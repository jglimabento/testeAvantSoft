describe('Login', () => {
  it('Deve logar com credenciais válidas', () => {
    cy.login('admin')
  })

  it('Não deve logar com senha incorreta', () => {
    cy.fixture('usuarios').then(users => {
      cy.visit('/login')
      cy.get('input[type="email"]').type(users.invalido.email)
      cy.get('input[type="password"]').type(users.invalido.senha)
      cy.get('button[type="submit"]').click()
      cy.contains('Credenciais inválidas').should('be.visible')
    })
  })
})
