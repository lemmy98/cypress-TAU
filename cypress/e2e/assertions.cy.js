/// <reference types="cypress" />>

it('making assertions', () => {

    cy.visit('/board/1')

    cy.get('[data-cy="list-name"]')
        .should('have.value', 'groceries')

    cy.get('[data-cy="card-text"]')
        .should('have.text', 'bread')

})