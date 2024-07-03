Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(nome, sobrenome){
    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type('robledo@qa.com')
    cy.get('#open-text-area').type('ABCD')
    cy.get('button[type="submit"]').click()
    // cy.get('form').contains('Enviar').click() ou cy.contains('button', 'Enviar').click()
})