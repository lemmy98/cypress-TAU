beforeEach(() => {
    
    cy.eyesOpen({
        appName: 'Trell app'
    })

});

it('plugins', () => {

    cy.visit('/')

    cy.get('[data-cy=board-item]')
      .should('be.visible')

    cy.eyesCheckWindow()

});

afterEach(() => {
    
    cy.eyesClose()

});