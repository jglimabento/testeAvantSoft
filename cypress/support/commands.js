Cypress.Commands.add('login', (usuario = 'admin') => {
  cy.fixture('usuarios').then((users) => {
    const credentials = users[usuario]
    expect(credentials, `credentials fixture entry: ${usuario}`).to.exist

    cy.intercept('POST', '/api/login').as('postLogin')
    cy.visit('/login')
    cy.get('input[type="email"]').type(credentials.email)
    cy.get('input[type="password"]').type(credentials.senha, { log: false })
    cy.get('button[type="submit"]').click()
    cy.wait('@postLogin').its('response.statusCode').should('eq', 200)
  })
})

Cypress.Commands.add('alugarCarro', (dias, metodoPagamento = 'pix') => {
  if (!['pix', 'cartao'].includes(metodoPagamento)) {
    throw new Error(`Unsupported payment method: ${metodoPagamento}`)
  }

  cy.get('.vehicle-card').should('have.length.gt', 0).each(($card) => {
    if ($card.find('button:not([disabled])').length > 0) {
      cy.wrap($card).within(() => {
        cy.get('button:not([disabled])').first().click()
      })
      return false
    }
  })

  cy.get('input[type="number"]').should('be.visible').clear().type(String(dias))
  cy.contains('button', 'Confirmar Aluguel')
    .should('be.visible')
    .and('not.be.disabled')
    .click()

  cy.contains('h2', 'Pagamento', { timeout: 10000 }).should('be.visible')

  if (metodoPagamento === 'pix') {
    cy.contains('button', 'PIX', { timeout: 5000 }).should('be.visible').click()
  } else {
    cy.get('input[value="cartao"]').should('be.visible').click()
  }

  cy.contains('button', 'Confirmar Pagamento').should('be.visible').click()
})
