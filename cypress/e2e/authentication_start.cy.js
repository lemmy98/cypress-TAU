/// <reference types="cypress" />

Cypress.Commands.add('login', (input) => {

    cy.session('user1', () => {
        

        cy.visit('/login')

        cy.get('[data-cy="login-email"]')
        .type('filip@filipphric.sk')

        cy.get('[data-cy="login-password"]')
        .type('Asdf.1234#')

        cy.get('[data-cy="login-submit"]')
        .click()

        cy.location('pathname')
        .should('eq', '/')


    }, {
        cacheAcrossSpecs: true,
        validate() {
            cy.getCookie('auth_cookie')
              .its('value')
              .then( token => {
                  cy.request({
                      url: '/api/users/1',
                      headers: {
                          Authorization: `Bearer ${token}`
                      }
                  })
              })
        }
    })

})

it.only('Logged in user sees private board', () => {

    cy.login()

    cy.visit('/')

    cy.get('[data-cy=board-item]')
      .should('be.visible')
})

it('Opens the private board', () => {

    cy.login()

    cy.visit('/')

    cy.get('[data-cy=board-item]')
      .click()
})

it('Logs out logged in user', () => {

    cy.login()

    cy.visit('/')

    cy.get('[data-cy="logged-user"]')
      .click()

    cy.contains('Get started!')
      .should('be.visible')
})
