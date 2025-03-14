it('sends a request over API', () => {

    cy.request('POST', '/api/boards', {
        name: 'Direct HTTP reequest'
    }).then((response) => {
        expect(response.status).to.eq(201); // Created
        expect(response.body.name).to.eq('Direct HTTP reequest');
    });

    cy.visit('/')
    
});

it('response gets 201 status', () => {

    cy.request('POST', '/api/boards', {
        name: 'created by cy.request()'
    }).its('status')
      .should('eq', 201)
    
});

it('testing board list', () => {

    cy.request({
        method: 'GET',
        url: '/api/boards',
        headers: {
            accept: 'application/json'
        }
    }).then( boards => {
        
        expect(boards.status).eq(200)
        expect(boards.body).to.have.length(2)
        expect(boards.body[0].id).to.be.a('number')
    })
    
});

before('resetting database', () => {

    cy.request('POST', '/api/reset')

});