/// <reference types="cypress" />

import { contains } from 'cypress/types/jquery'
import { cardsLoadRandomly } from '../../evilCode'

it('chaining and retrying', () => {

    // cardsLoadSlowly(5000)
    cardsLoadRandomly(4000)

    cy.visit('/board/1')

    cy.get('[data-cy=card]')
        .last()
        .should('contain.text', 'shampoo')
        .click()

    cy.get('[data-cy=card-detail-title]')
        .should('have.value', 'shampoo')

    // cy.contains('[data-cy=card]', 'Mar 11 2025')

    // cy.get('[data-cy=list]')
    //     .eq(1)
    //     .contains('[data-cy=card]', 'Mar 11 2025')

})