it('check text of all cards in first list', () => {

    cy.visit('/board/1')

    cy.get('[data-cy=card-text]')
      .then((cards) => { //.should() for retryability
          expect(cards[0]).to.have.text('Milk')

          expect(cards[1]).to.have.text('Bread')

          expect(cards[2]).to.have.text('Juice')
      })
});