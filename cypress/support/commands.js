// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add('login', (email, password) => {

    // cy.session('user1', () => {

        cy.visit('/login')

          .get('[data-cy="login-email"]').type(email)

          .get('[data-cy="login-password"]').type(password)

          .get('[data-cy="login-submit"]').click();
            
        cy.location('pathname')
          .should('eq', '/')
    // })
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getDataCy', (input) => {

    Cypress.log({
        displayName: 'getDataCy',
        message: input,
        consoleProps() {
            return {
                selector: input
            }
        },
    })

    cy.get(`[data-cy="${input}"]`, {log: false})

})

Cypress.Commands.add('verifyText', (selector, index ,expectedText) => {
    cy.get(selector)
      .should('have.length', 3)
      .eq(index)
      .should('be.visible')
      .and('contain.text', expectedText);
  });