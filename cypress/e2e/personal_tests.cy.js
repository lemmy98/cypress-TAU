describe("Lemmy's Tests", () => {

    it('first test', () => {

        cy.visit('/')

        cy.get('[data-cy="first-board"]')
          .type('My To Do Board{enter}')

        cy.visit('/')

        cy.get('[data-cy="create-board"]')
          .type('Another To Do Board{enter}')
    })

    it('open first board', () => {

        cy.visit('/')

        cy.get('[data-cy="board-item"]')
          .first()
          .click()

        cy.get('[data-cy="add-list-input"]')
          .type('Car Repair List{enter}')

        cy.contains('Add another card')
          .click()

        cy.get('[data-cy="new-card-input"]')
          .type('Shaft{enter}')

        cy.get('[data-cy="new-card-input"]')
          .type('Horn{enter}')

        cy.contains('Add another list')
          .click()

        cy.get('[data-cy="add-list-input"]')
          .type('House Renovations List{enter}')

        cy.contains('Add another card')
            .click()
    })

    // it.('Add card to second list', () => {

    //     cy.visit('/board/1')

    //     // Select the last list
    //     cy.get('[data-cy="list-name"]')
    //         .last()
    //         .parent()
    //         .as('lastList'); // Store the last list for reuse

    //     // Click on the list options button
    //     cy.get('@lastList')
    //         .find('[data-cy="list-options"]')
    //         .should('be.visible') // Ensure it's visible before clicking
    //         .click()
    //         .as('menu')
            
    //     cy.get('@menu')
    //         .find('[data-cy="card-add"]')

        
            

    //     // cy.get('[data-cy="list-name"]')
    //     //   .last()
    //     //   .parent()
    //     //   .find('[data-cy="list-options"]')
    //     //   .children()
    //     //   .should('have.attr', 'data-cy', 'list-options')
    //     //   .contains('Plumbing Work')
    //     //   .click()
    //     //   .find('[data-cy="list-options"]')
    //     //   .click()
    //     //   .type('Repaint{enter}')
    // })

    it('Confirmation assertions', () => {

        cy.visit('/board/1')

        cy.get('[data-cy="list-name"]')
          .should('have.length', 2)

        cy.get('[data-cy="list-name"]')
          .eq(1)
          .should('have.value', 'House Renovations List')

        cy.get('[data-cy="card-text"]')
          .should('have.length', 3)
          .eq(1)
          .should('have.text', 'Horn')
    })

    it('Retryability', () => {

      cy.visit('/board/1')
      
      cy.get('[data-cy="card-text"]')
          .should('have.length', 3)
    })

    it('Intercepts & Stubbing', () => {

      cy.intercept('GET', '/api/lists?boardId=1', {
        statusCode: 200, 
        fixture:'twoBoards.json'
        //   body: [{
        //     name: "TAU",
        //     starred: true,
        //     id: 11,
        //     user: 0,
        //     created: '2025-14-03'
        // }]
      }).as('mockedResponse')

      cy.visit('/board/1')

      cy.wait('@mockedResponse')

      // cy.get('[data-cy="board-list-error-message"]').should('contain', 'There was an error loading board');
    })

    it('shows an error message when creating a board', () => {

      cy.intercept({
          method: 'POST',
          url: 'api/boards'
      }, {
          statusCode: 500 //still stubbing
      })
        .as('boardCreate')
  
      cy.visit('/')
  
      cy.get('[data-cy=create-board]')
        .click()
  
      cy.get('[data-cy=new-board-input]')
        .type('garden project{enter}')
  
      cy.get('[data-cy="notification-message"]')
        .should('be.visible')
      
  });

  it('API Testing', () => {

    cy.request('POST', '/api/boards', {
      name: 'Direct HTTP request'
    }).then((response) => {
        expect(response.status).to.eq(201); // Created
        expect(response.body.name).to.eq('Direct HTTP request');
        cy.visit(`/board/${response.body.id}`); // opens the created board after assertion confirmed
    });
  });

  it('interacting with DB', () => {

    cy.task('log', "Hello from cypress")

    cy.task('seedDatabase', {
      "boards": [
        {
          "name": "My To Do Board",
          "user": 0,
          "starred": false,
          "created": "2025-03-13",
          "id": 1
        },
        {
          "name": "Another To Do Board",
          "user": 0,
          "starred": false,
          "created": "2025-03-13",
          "id": 2
        },
        {
          "name": "Seeding DB",
          "user": 0,
          "starred": false,
          "created": "2025-03-14",
          "id": 3
        }
      ],
      "cards": [
        {
          "order": 0,
          "boardId": 1,
          "listId": 1,
          "name": "Shaft",
          "created": "2025-03-13",
          "deadline": "2025-03-16",
          "description": "",
          "completed": false,
          "id": 1
        },
        {
          "order": 1,
          "boardId": 1,
          "listId": 1,
          "name": "Horn",
          "created": "2025-03-13",
          "deadline": "2025-03-16",
          "description": "",
          "completed": false,
          "id": 2
        },
        {
          "order": 0,
          "boardId": 1,
          "listId": 2,
          "name": "Plumbing Work",
          "created": "2025-03-13",
          "deadline": "2025-03-16",
          "description": "",
          "completed": false,
          "id": 3
        }
      ],
      "lists": [
        {
          "boardId": 1,
          "name": "Car Repair List",
          "order": 0,
          "created": "2025-03-13",
          "id": 1
        },
        {
          "boardId": 1,
          "name": "House Renovations List",
          "order": 1,
          "created": "2025-03-13",
          "id": 2
        }
      ],
      "users": [
        {
          "email": "cypress@test.com",
          "password": "test123@"
        }
      ]
    })

    cy.visit('/')
  });

  it.only('Using Custom Commands', () => {

      cy.visit('/board/1')

      cy.contains('Add another card')
            .click()
            
      cy.verifyText('[data-cy="card-text"]', 1, 'Horn')

      cy.getDataCy('new-card-input')
      // cy.get('textarea')
        .type('Body Work')
      
  })

})

describe('User Authentication', () => {
  it('should log in successfully', () => {
    cy.login('test@example.com', 'test123');
  });

  // it('should log out successfully', () => {
  //   cy.login('test@example.com', 'test123');
  //   cy.get('[data-cy=logout]').click();
  //   cy.url().should('contain', '/login');
  // });
});