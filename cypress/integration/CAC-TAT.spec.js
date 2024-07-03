/// <reference types="Cypress" />


describe('preenche os campos obrigatórios e envia o formulário', function(){
    beforeEach(() => {
        cy.visit('../../src/index.html')
    })

    it('Verifica o titulo da aplicação', function(){
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatório e envia o formulário', function(){
        const longText = 'ExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABCExemploABC'
        cy.get('#firstName')
            .should('be.visible')
            .type('Robledo')
            .should('have.value', 'Robledo')

        cy.get('#lastName')
            .should('be.visible')
            .type('Pereira')
            .should('have.value', 'Pereira')
        cy.get('#email')
            .should('be.visible')
            .type('robledo@qa.com')
            .should('have.value', 'robledo@qa.com')
        cy.get('#open-text-area')
            .type(longText, { delay: 0 })
        cy.get('button[type="submit"]')
            .click()
        cy.get('.success')
            .should('be.visible')
          //  .should('be.equal', 'Mensagem enviada com sucesso.')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('button[type="submit"]')
        .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('valida campo numérico telefone', function(){
        cy.get('#phone')
            .type('abc')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Robledo')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('robledo@qa.com')
        cy.get('#open-text-area').type('ABCD')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Robledo')
            .should('have.value', 'Robledo')
            .clear()
            .should('have.value', '')
        cy.get('#lastName').type('Pereira')
        cy.get('#email').type('robledo@qa.com')
        cy.get('#phone').type('984472816', { delay: 0})
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit('Robledo', 'Pereira')
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
        cy.get('select').select(2).should('have.value', 'cursos')
        cy.get('select').select('YouTube').should('have.value', 'youtube')
    })

    it('testa radio', function(){
       // cy.get('[type="radio"]').first().check().should('have.value', 'ajuda')
       cy.get('[type="radio"]').check('ajuda').should('have.value', 'ajuda')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('[type="radio"]').each(function($radio) {
            cy.wrap($radio).check().should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
     })

     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
     })

     it('remove o blank do link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') // remove o _blank do target
            .click()
        cy.contains('Talking About Testing').should('be.visible')
     })

})
