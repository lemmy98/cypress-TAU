it('resets a database', () => {

    cy.task('seedDatabase', {
        boards: [{
            "name": "Hello world",
            "user": 0,
            "id": 1,
            "starred": true,
            "created": "2025-03-11"
          }],
        cards: [],
        lists: [],
        users: []
    })
    cy.visit('/')

});